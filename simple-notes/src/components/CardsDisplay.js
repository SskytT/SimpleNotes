import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const CardsDisplay = ({ notes, groups, onDeleteItem, onUpdateNote, onUpdateGroup }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const handleShowDeleteModal = (item) => {
        setCurrentItem(item);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (currentItem) {
            onDeleteItem(currentItem.id, currentItem.type);
        }
        setShowDeleteModal(false);
    };

    return (
        <>
            <Row className="mb-4">
                {groups.map((group) => (
                    <Col key={group.id} md={4} className="mb-3">
                        <Card onClick={() => onUpdateGroup(group.id)} style={{ cursor: 'pointer' }}>
                            <Card.Body style={{ position: 'relative' }}>
                                <Card.Title
                                    style={{
                                        wordBreak: 'break-word',
                                        paddingRight: '40px',
                                        lineHeight: '1.5', // Increase line height
                                        paddingBottom: '0.1rem', // Add bottom padding
                                        paddingTop: '0rem', // Add top padding
                                        fontSize: '1.25rem' // Adjust font size if needed
                                    }}
                                >
                                    {group.name}
                                </Card.Title>
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
                                        handleShowDeleteModal({ id: group.id, type: 'group' });
                                    }}
                                />
                                <hr style={{ margin: '10px 0', borderTop: '1px solid #000', width: 'calc(100% + 32px)', transform: 'translateX(-16px)' }} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                {notes.map((note) => (
                    <Col key={note.id} md={4} className="mb-3">
                        <Card onClick={() => onUpdateNote(note.id)} style={{ cursor: 'pointer' }}>
                            <Card.Body style={{ position: 'relative' }}>
                                <Card.Title
                                    style={{
                                        wordBreak: 'break-word',
                                        paddingRight: '40px',
                                        lineHeight: '1.5', // Increase line height
                                        paddingBottom: '0.1rem', // Add bottom padding
                                        paddingTop: '0rem', // Add top padding
                                        fontSize: '1.25rem' // Adjust font size if needed
                                    }}
                                >
                                    {note.name}
                                </Card.Title>
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
                                        handleShowDeleteModal({ id: note.id, type: 'note' });
                                    }}
                                />
                                <hr style={{ margin: '10px 0', borderTop: '1px solid #000', width: 'calc(100% + 32px)', transform: 'translateX(-16px)' }} />
                                <Card.Text style={{ wordBreak: 'break-word' }}>
                                    {note.content}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Вы действительно хотите удалить?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CardsDisplay;
