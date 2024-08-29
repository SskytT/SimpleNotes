import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const NoteModal = ({ noteDetails, goBack, userGroups, onEdit }) => {
    const [noteName, setNoteName] = useState(noteDetails.name);
    const [noteContent, setNoteContent] = useState(noteDetails.content);
    const [selectedGroup, setSelectedGroup] = useState(noteDetails.group || 'no-group');
    const [initialDetails, setInitialDetails] = useState(noteDetails);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const groupsToDisplay = userGroups.length > 0
        ? [...userGroups, { id: null, name: 'Без группы' }]
        : [{ id: null, name: 'Без группы' }];

    useEffect(() => {
        // Устанавливаем начальные значения при изменении noteDetails
        setNoteName(noteDetails.name);
        setNoteContent(noteDetails.content);
        setSelectedGroup(noteDetails.group || 'no-group');
        setInitialDetails(noteDetails);
    }, [noteDetails]);

    const handleEdit = async () => {
        /*
        if (!noteContent.trim()) {
            setError('Содержание заметки не может быть пустым');
            return;
        }
        if (noteName.length > 200) {
            setError('Длина имени не должна превышать 200 символов');
            return;
        }
        */

        const updatedData = {};
        if (noteName !== initialDetails.name) updatedData.name = noteName;
        if (noteContent !== initialDetails.content) updatedData.content = noteContent;
        if (selectedGroup !== (initialDetails.group || 'no-group')) {
            updatedData.group = selectedGroup === 'no-group' ? null : parseInt(selectedGroup);
        }

        if (Object.keys(updatedData).length > 0) {
            const result = await onEdit(noteDetails.pk, updatedData);
            if (result.success) {
                setSuccess(result.message);
                setError('');
                // Обновляем начальные значения после редактирования
                setInitialDetails({ ...noteDetails, ...updatedData });
            } else {
                setError(result.message);
                setSuccess('');
                console.log("неудача")
            }
        }
        if (!noteContent.trim()) {
            setError('Содержание заметки не может быть пустым');
            return;
        }
        if (noteName.length > 200) {
            setError('Длина имени не должна превышать 200 символов');
            return;
        }
    };

    return (
        <Container className="mt-5" style={{ fontSize: '1.25rem' }}>
            <Row className="mt-3">
                <Col className="d-flex justify-content-start">
                    <Button variant="secondary" onClick={goBack} size="lg">Назад</Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <h1 className="text-center mb-4">Заметка</h1>

                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form>
                        <Form.Group controlId="noteName">
                            <Form.Label >Название заметки:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название заметки"
                                value={noteName}
                                onChange={(e) => setNoteName(e.target.value)}
                                style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="noteGroup" className="mt-3">
                            <Form.Label>Группа:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                            >
                                {groupsToDisplay.map(group => (
                                    <option key={group.id || 'no-group'} value={group.id || 'no-group'}>
                                        {group.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="noteContent" className="mt-3">
                            <Form.Label>Текст заметки:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="Введите текст заметки"
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                style={{ fontSize: '1.1rem', padding: '0.75rem' }}
                            />
                        </Form.Group>

                        <div className="text-center mt-4">
                            <Button variant="primary" onClick={handleEdit} size="lg">
                                Редактировать
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default NoteModal;
