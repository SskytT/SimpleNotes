import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateGroupModal = ({ show, onHide, onCreateGroup, onClose }) => {
    const [groupName, setGroupName] = useState('');

    const handleCreate = async () => {
        const result = await onCreateGroup(groupName);
        if (result.success) {
            onHide(); // Закрываем модальное окно после успешного создания
            onClose();
            resetForm(); // Сбрасываем форму после создания
        } else {
            console.error(result.message);
        }
    };

    const resetForm = () => {
        setGroupName(''); // Сбрасываем состояние
    };

    // Сбрасываем форму при закрытии модального окна
    const handleClose = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Создать группу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название группы"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGroupModal;
