# Используем базовый образ Nginx
FROM nginx:alpine

# Копируем файлы из папки build в папку Nginx
COPY ./build /usr/share/nginx/html

# Копируем кастомный nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


# Экспонируем порт 80
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
