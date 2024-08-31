# pull official base image
FROM python:3.10-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
 && apk add gcc python3-dev

# install python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN apk update && \
    apk add --no-cache \
    nginx


# copy project
COPY . .

COPY ./nginx.conf /etc/nginx/nginx.conf

# Копируем SSL-сертификаты
COPY ./certs/cert.pem /etc/ssl/certs/
COPY ./certs/key.pem /etc/ssl/private/

# Команда запуска Nginx и Django
CMD ["sh", "-c", "nginx && gunicorn SimpleNotes.wsgi:application --bind 0.0.0.0:8000"]