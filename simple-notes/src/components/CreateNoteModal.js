import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const CreateNoteModal = ({ userGroups, onCreate, onClose }) => {
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('no-group');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const groupsToDisplay = userGroups.length > 0
        ? [...userGroups, { id: null, name: 'Без группы' }]
        : [{ id: null, name: 'Без группы' }];

    const handleCreate = async () => {
     

        const newNote = {
            name: noteName,
            content: noteContent,
            group: selectedGroup === 'no-group' ? null : parseInt(selectedGroup),
        };

        const result = await onCreate(newNote);
        if (result.success) {
            setSuccess('Заметка успешно создана');
            setError('');
            // Close the modal after a short delay
            setTimeout(() => onClose(), 1500);
        } else {
            setError(result.message);
            setSuccess('');
        }
        if (!noteContent.trim()) {
            setError('Содержание заметки не могут быть пустыми');
            return;
        }
        if (noteName.length > 200) {
            setError('Длина имени не должна превышать 200 символов')
        }
    };

    return (
        <Container className="mt-5" style={{ fontSize: '1.25rem' }}>
            <Row className="mt-3">
                <Col className="d-flex justify-content-start">
                    <Button variant="secondary" onClick={onClose} size="lg">Назад</Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <h1 className="text-center mb-4">Создать Заметку</h1>

                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form>
                        <Form.Group controlId="noteName">
                            <Form.Label>Название заметки:</Form.Label>
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
                            <Button variant="primary" onClick={handleCreate} size="lg">
                                Создать
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateNoteModal;
