import React, { useState } from 'react';
import { Button, Card, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { FaTrash } from 'react-icons/fa';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const GroupModal = ({ groupData, onGetNote, goBack }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [notes, setNotes] = useState(groupData.data);
    const [noteName, setNoteName] = useState(groupData.name);
    const [updateMessage, setUpdateMessage] = useState('');
    const [error, setError] = useState('');

    if (!groupData) {
        return <p>No group data available.</p>;
    }

    if (groupData.answer === "token is invalid") {
        return <p>No group data available.</p>;
    }

    if (groupData === null) {
        return <p>No group data available.</p>;
    }

    const { name, id } = groupData;

    const handleDeleteClick = (noteId) => {
        setNoteToDelete(noteId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (noteToDelete) {
            try {
                const apiKey = localStorage.getItem('apiKey');
                const response = await fetch(`${apiUrl}/api/v1/note/${noteToDelete}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Api-Key ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();

                if (response.ok && result.answer === "note deleted") {
                    setNotes(notes.filter(note => note.id !== noteToDelete));
                    setShowDeleteModal(false);
                    setNoteToDelete(null);
                } else {
                    console.error('Ошибка удаления заметки');
                    setShowDeleteModal(false);
                }
            } catch (error) {
                console.error('Ошибка при попытке удалить заметку:', error);
                setShowDeleteModal(false);
            }
        }
    };
    
    const handleUpdateGroup = async () => {
        try {
            const apiKey = localStorage.getItem('apiKey');
            const response = await fetch(`${apiUrl}/api/v1/group/${id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: noteName })
            });
            
            const result = await response.json();
            if (result.answer === "token is invalid")
                window.location.reload();
            if (response.ok && result.answer === "group updated") {
                setUpdateMessage('Группа успешно обновлена');
                setTimeout(() => setUpdateMessage(''), 3000);
                return
            }
            else if (result.name[0] === 'Ensure this field has no more than 200 characters.') {
                console.error("Ошибка обновления группы")
                setError('Имя группы не должно превышать 200 символов')
            }
            else if (result.name[0] === 'This field may not be blank.') {
                console.error("Ошибка обновления группы")
                setError('Поле не должно быть пустым')
            }
            else {
                console.error('Ошибка обновления группы');
                setError('Время авторизации истекло, пожалуйста перезайдите');

            }
        } catch (error) {
            console.error('Ошибка при попытке обновить группу:', error);
        }
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col xs={12} className="text-center">
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12} sm={3} className="d-flex justify-content-start mb-3 mb-sm-0">
                    <Button variant="secondary" onClick={goBack} size="lg">Назад</Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12} sm={{ span: 6, offset: 3 }} className="d-flex justify-content-center">
                    <Form className="w-100 d-flex align-items-center flex-column">
                        <Form.Control
                            type="text"
                            placeholder="Новое название группы"
                            value={noteName}
                            onChange={(e) => setNoteName(e.target.value)}
                            className="w-100 mb-3"
                            style={{ fontSize: '1.5rem', padding: '1rem' }}
                        />
                        <Button
                            variant="primary"
                            onClick={handleUpdateGroup}
                            size="lg"
                            className="w-50"
                        >
                            Обновить
                        </Button>
                    </Form>
                </Col>
            </Row>
                    {error && <Alert variant="danger">{error}</Alert>}
            {updateMessage && (
                <Row className="mb-4">
                    <Col>
                        <Alert variant="success" className="text-center">
                            {updateMessage}
                        </Alert>
                    </Col>
                </Row>
            )}

            <Row>
                {notes.map((note) => (
                    <Col key={note.id} xs={12} md={6} lg={4} className="mb-4">
                        <Card className="h-100 shadow-sm" style={{ cursor: 'pointer' }}>
                            <Card.Body onClick={() => onGetNote(note.id)} style={{ position: 'relative' }}>
                                <Card.Title className="d-flex justify-content-between align-items-center" style={{ wordBreak: 'break-word', paddingRight: '40px', fontSize: '1.25rem', lineHeight: '1.5', paddingTop: '0rem' }} >
                                    {note.name}
                                    <FaTrash
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            cursor: 'pointer',
                                            color: 'red',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(note.id);
                                        }}
                                    />
                                </Card.Title>
                                <hr style={{ margin: '10px 0', borderTop: '1px solid #000', width: 'calc(100% + 32px)', transform: 'translateX(-16px)' }} />
                                <Card.Text className="text-muted">
                                    {note.content}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <ConfirmDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
};

export default GroupModal;
