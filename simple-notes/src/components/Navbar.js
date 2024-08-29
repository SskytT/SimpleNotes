import React from 'react';

const Navbar = ({ onRegisterClick, onLoginClick, isAuthenticated, onLogout, onChangePasswordClick }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">Simple Notes</span>
                <div className="d-flex">
                    {!isAuthenticated && (
                        <>
                            <button
                                className="btn btn-outline-light me-2"
                                onClick={onChangePasswordClick}
                            >
                                Восстановить пароль
                            </button>
                            <button
                                className="btn btn-outline-light me-2"
                                onClick={onRegisterClick}
                            >
                                Регистрация
                            </button>
                            <button
                                className="btn btn-outline-light"
                                onClick={onLoginClick}
                            >
                                Авторизация
                            </button>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <button
                                className="btn btn-outline-light me-2"
                                onClick={onLogout}
                            >
                                Выйти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
