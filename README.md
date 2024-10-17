# SimpleNotes

**SimpleNotes** - веб-приложение для создания, редактирования, группирования и удаления заметок. Для доступа к возможностям приложения необходимо пройти регистрацию и авторизацию.

## Основные функции

- **Регистрация**: Реализована на основе подтверждения введённой почты.
- **Авторизация**: Используются API ключи, которые хранятся на сервере и имеют срок действия.
- **Смена пароля**: Возможность смены пароля пользователями.

## Архитектура приложения

- **Серверная часть**: Разработана на Django с использованием Django REST Framework.
- **Клиентская часть**: Создана с помощью React.
- **Проксирование**: Используется Nginx для проксирования запросов, а также для работы собранного React-приложения.
- **Контейнеризация**: Все компоненты приложения работают в контейнерах с использованием Docker и Docker Compose.
- **Безопасность**: Приложение работает по протоколу HTTPS.

## Развертывание

Сервер был успешно запущен на хостинге. 

**Ссылка на запущенный на хостинге сайт**: https://regmail21.fvds.ru/ (в данный момент не работает, так как не оплачен).

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone <URL вашего репозитория>
2. Перейдите в корневую директорию проекта(с файлом docker-compose)
3. Запуск: 
   Выполните команду
   ```bash
   docker-compose up --build
4. Сервер доступен на https://localhost/
