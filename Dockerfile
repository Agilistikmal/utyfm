FROM node:alpine

RUN apk update && apk add --no-cache git

WORKDIR /app

COPY . .

RUN npm install

RUN node app.js