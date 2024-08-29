import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const ChangePasswordModal = ({ show, onHide, onChangePassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangePassword = async () => {
        const response = await fetch(`${apiUrl}/api/v1/changepass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const result = await response.json();
        if (result.url) {
            onChangePassword(result.url);
        }
        var str = "";
        var alert_flag = false;
        if (result.email) {
            str += "Введите корректную почту\r\n"
            alert_flag = true;
        }
        if (result.password) {
            str += "Введите пароль\r\n"
            alert_flag = true
        }
        if (alert_flag) {
            alert(str)
        }
        if (result.error) {
            alert("Ошибка. Такого аккаунта нет.");
        }
        if (result.answer) {
            alert("Подождите для отправки следующего кода")
        }
        console.log(apiUrl)
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Восстановление пароля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите новый пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleChangePassword}>
                    Восстановить пароль
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePasswordModal;
