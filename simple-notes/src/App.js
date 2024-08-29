import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RegistrationModal from './components/RegistrationModal';
import VerificationModal from './components/VerificationModal';
import LoginModal from './components/LoginModal';
import CardsDisplay from './components/CardsDisplay';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import NoteModal from './components/NoteModal';
import GroupModal from './components/GroupModal';
import CreateNoteModal from './components/CreateNoteModal';
import CreateGroupModal from './components/CreateGroupModal';
import { FaPlus, FaFolderPlus } from 'react-icons/fa';
import './components/App.css'; // Путь к вашему CSS файлу
import VerificationChangePasswordModal from './components/VerificationChangePasswordModal';
import ChangePasswordModal from './components/ChangePasswordModal';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('apiKey'));
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [verificationUrl, setVerificationUrl] = useState('');
    const [notes, setNotes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('home'); // Состояние для текущей страницы
    const [noteDetails, setNoteDetails] = useState(null); // Состояние для хранения данных заметки
    const [userGroups, setUserGroups] = useState([]);
    const [groupData, setGroupData] = useState(null);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [NotNullKey, setNotNullKey] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showVerificationChangePasswordModal, setShowVerificationChangePasswordModal] = useState(false);
    const [changePasswordUrl, setChangePasswordUrl] = useState('');


    // Обработчики действий
    const handleRegisterClick = () => setShowRegisterModal(true);
    const handleLoginClick = () => setShowLoginModal(true);
    const handleChangePasswordClick = () => setShowChangePasswordModal(true);

    const handleRegistered = (url) => {
        setVerificationUrl(url);
        setShowRegisterModal(false);
        setShowVerificationModal(true);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setShowLoginModal(false);
        setCurrentPage('home');
        fetchNotesAndGroups();
    };

    const handlePasswordChanged = (url) => {
        setChangePasswordUrl(url);
        setShowChangePasswordModal(false);
        setShowVerificationChangePasswordModal(true);
    };

    const handleDeleteItem = async (itemId, itemType) => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const response = await fetch(`${apiUrl}/api/v1/${itemType}/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            checkTokenValidity(responseData);
            if (response.ok) {
                if (itemType === 'note') {
                    setNotes(notes.filter(note => note.id !== itemId));
                } else if (itemType === 'group') {
                    setGroups(groups.filter(group => group.id !== itemId));
                }
            } else {
                console.error('Error deleting item');
            }
        } catch (error) {
            console.error('Error during delete:', error);
        }
    };

    const fetchNotesAndGroups = async () => {
        const apiKey = localStorage.getItem('apiKey');
        setLoading(true);
        try {
            let noteResponse;
            if (apiKey !== null) {
                noteResponse = await fetch(`${apiUrl}/api/v1/note`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Api-Key ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
            else {
                noteResponse = await fetch(`${apiUrl}/api/v1/note`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            const data = await noteResponse.json();
            if (data.answer == "token is invalid") {
                localStorage.removeItem('apiKey');
                setIsAuthenticated(false);
                setError("Session expired. Please log in again.");
                return;
            }
            if (data.answer == "authorization required") {
                setNotNullKey(false)
                setIsAuthenticated(false);
                return;
            }
               

            if (!noteResponse.ok) {
                throw new Error('Network response was not ok');
            }
            setError(null);
            setNotes(data.notes);
            setGroups(data.groups);
            setNotNullKey(true)
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGetNote = async (id) => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const noteResponse = await fetch(`${apiUrl}/api/v1/note/${id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!noteResponse.ok) {
                console.error('Error fetching note');
                return;
            }
            const noteData = await noteResponse.json();
            checkTokenValidity(noteData);
            setNoteDetails(noteData);
            const groupResponse = await fetch(`${apiUrl}/api/v1/group`, {
                method: 'GET',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!groupResponse.ok) {
                console.error('Error fetching groups');
                return;
            }
            const groupsData = await groupResponse.json();
            setUserGroups(groupsData);
            setCurrentPage('note');

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const handleGetGroups = async () => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const groupResponse = await fetch(`${apiUrl}/api/v1/group`, {
                method: 'GET',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!groupResponse.ok) {
                console.error('Error fetching groups');
                return;
            }
            const groupsData = await groupResponse.json();
            setUserGroups(groupsData);
            setCurrentPage('createNote');

        }
        catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const handleUpdateNote = async (noteId, updatedData) => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const response = await fetch(`${apiUrl}/api/v1/note/${noteId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            console.log(response)
            if (response.ok) {
                const responseData = await response.json();
                checkTokenValidity(responseData);
                if (responseData.answer === "note updated") {
                    return { success: true, message: 'Заметка успешно обновлена' };
                } else {
                    return { success: false, message: responseData.answer || 'Note updated successfully' };
                }
            }
            else {
                console.error('Error updating note');
                return { success: false, message: 'Ошибка при обновлении заметки' };
            }
        } catch (error) {
            console.error('Error during update:', error);
            return { success: false, message: 'Ошибка при обновлении' };
        }
    };




    const handleGetGroup = async (id) => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const response = await fetch(`${apiUrl}/api/v1/group/${id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const groupData = await response.json();
                checkTokenValidity(groupData);
                setGroupData(groupData)
                setCurrentPage('group');

            } else {
                console.error('Error fetching group');
            }
        }
        catch (error) {
            console.error('Error during update:', error);
        }
    }

    const handleCreateNote = async (newNote) => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const response = await fetch(`${apiUrl}/api/v1/note`, {
                method: 'POST',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });
            if (response.ok) {
                const responseData = await response.json();
                checkTokenValidity(responseData)
                if (responseData.answer === "note successfully created") {
                    setNotes([...notes, responseData.note]);
                    return { success: true, message: 'Заметка успешно создана' };
                } else {
                    return { success: false, message: responseData.answer || 'Ошибка при создании заметки' };
                }
            } else {
                console.error('Error creating note');
                return { success: false, message: 'Ошибка при создании заметки' };
            }
        } catch (error) {
            console.error('Error during creation:', error);
            return { success: false, message: 'Ошибка при создании' };
        }
    };

    const handleCreateGroup = async (groupName) => {
        const apiKey = localStorage.getItem('apiKey');
        try {
            const response = await fetch(`${apiUrl}/api/v1/group`, {
                method: 'POST',
                headers: {
                    'Authorization': `Api-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: groupName }),
            });
            if (response.ok) {
                return { success: true };
            }
       
            else {
                const data = await response.json();
                return { success: false, message: data.error || 'Ошибка создания группы' };
            }
        } catch (error) {
            console.error('Error creating group:', error);
            return { success: false, message: 'Ошибка создания группы' };
        }
    };


    const handleEditNote = async (noteId, updatedData) => {
        const result = await handleUpdateNote(noteId, updatedData);
        return result;
    };

    const handleLogout = () => {
        localStorage.removeItem('apiKey');
        setIsAuthenticated(false);
        setCurrentPage('home');
        fetchNotesAndGroups();
    };

    const checkTokenValidity = (responseData) => {
        if (responseData.answer === "token is invalid")
           window.location.reload(); // Перезагрузка страницы при недействительном токене
            
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotesAndGroups();
        } else {
            setLoading(false); // Если не авторизован, загрузка должна завершиться
        }
    }, [isAuthenticated]);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        {loading ? (
                            <div className="d-flex justify-content-center mt-5">
                                <Spinner animation="border" />
                            </div>
                        ) : error ? (
                            <Alert variant="danger">Ошибка: {error}</Alert>
                        ) : NotNullKey ? (
                            <CardsDisplay
                                        notes={notes}
                                        groups={groups}
                                        onDeleteItem={handleDeleteItem}
                                        onUpdateNote={handleGetNote} // Добавляем обработчик навигации
                                        onUpdateGroup={handleGetGroup}
                            /> 
                            
                                ) : <h1>Добро пожаловать в Simple Notes</h1>}
                        <CreateGroupModal
                            show={showCreateGroupModal}
                            onHide={() => setShowCreateGroupModal(false)}
                            onClose={() => {
                                setCurrentPage('home');
                                fetchNotesAndGroups(); // Обновляем данные при возврате
                            }}
                            onCreateGroup={handleCreateGroup}
                        />
                        {isAuthenticated && (
                            <>
                                {/* Фиксированные кнопки */}
                                <div className="fixed-buttons">
                                    <Button variant="success" size="lg" onClick={handleGetGroups} className="mb-2">
                                        <FaPlus /> Создать заметку
                                    </Button>
                                    <Button variant="primary" size="lg" onClick={() => setShowCreateGroupModal(true)}>
                                        <FaFolderPlus /> Создать группу
                                    </Button>
                                </div>
                            </>
                        )}

                    </>
                );
            case 'createNote':
                return <CreateNoteModal
                    onClose={() => {
                        setCurrentPage('home');
                        fetchNotesAndGroups(); // Обновляем данные при возврате
                    }}
                    userGroups={userGroups}
                    onCreate={handleCreateNote}
                />
            case 'note':
                return <NoteModal
                    noteDetails={noteDetails}
                    goBack={() => {
                        setCurrentPage('home');
                        fetchNotesAndGroups(); // Обновляем данные при возврате
                    }}
                    userGroups={userGroups}
                    onEdit={handleEditNote}
                />;
            case 'group':
                return <GroupModal
                    groupData={groupData}
                    onGetNote={handleGetNote}
                    goBack={() => {
                        setCurrentPage('home');
                        fetchNotesAndGroups(); // Обновляем данные при возврате
                    }}
                    onDeleteNote={handleDeleteItem}
                />
            default:
                return <div>Page not found</div>;

        }
    };

    return (
        <div>
            <Navbar
                onRegisterClick={handleRegisterClick}
                onLoginClick={handleLoginClick}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                onChangePasswordClick={handleChangePasswordClick}
      
            />
            <Container className="mt-5">
                {renderPage()}
            </Container>

            <RegistrationModal
                show={showRegisterModal}
                onHide={() => setShowRegisterModal(false)}
                onRegistered={handleRegistered}
            />

            <VerificationModal
                show={showVerificationModal}
                onHide={() => setShowVerificationModal(false)}
                verificationUrl={verificationUrl}
            />

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />
            <ChangePasswordModal
                show={showChangePasswordModal}
                onHide={() => setShowChangePasswordModal(false)}
                onChangePassword={handlePasswordChanged}
            />
            <VerificationChangePasswordModal
                show={showVerificationChangePasswordModal}
                onHide={() => setShowVerificationChangePasswordModal(false)}
                changePasswordUrl={changePasswordUrl}
            />
        </div>
    );
}

export default App;
