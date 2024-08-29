# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json ./
COPY package-lock.json ./

# Устанавливаем зависимости
RUN npm install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Определяем команду запуска
CMD ["npm", "start"]
