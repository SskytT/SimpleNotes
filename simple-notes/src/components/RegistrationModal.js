import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const RegistrationModal = ({ show, onHide, onRegistered }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleRegister = async () => {
        const response = await fetch(`${apiUrl}/api/v1/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname,
            })
        });

        const result = await response.json();
        if (result.url) {
            onRegistered(result.url);
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
        if (result.nickname) {
            str += "Введите ник"
            alert_flag = true
        }
        if (alert_flag) {
            alert(str)
        }
        if (result.error)
        {
            alert("Ошибка регистрации. Эта почта уже занята.");
        }
        if (result.answer)
        {
            alert("Подождите для отправки следующего кода")
        }
        console.log(apiUrl)
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
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
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNickname">
                        <Form.Label>Ник</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите ник"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleRegister}>
                    Зарегистрироваться
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistrationModal;
