import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const VerificationModal = ({ show, onHide, verificationUrl }) => {
    const [code, setCode] = useState('');

    const handleVerification = async () => {
        const response = await fetch(`${apiUrl}/api/v1/registration/${verificationUrl}/?code=${code}`, {
            method: 'GET'
        });

        const result = await response.json();
        if (result.answer === "verification was successful") {
            alert("Регистрация успешно завершена!");
            onHide();
        } else {
            alert("Ошибка подтверждения. Попробуйте снова.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение кода</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formCode">
                        <Form.Label>Код подтверждения</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите код"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleVerification}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VerificationModal;
