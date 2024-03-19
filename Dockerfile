FROM node

WORKDIR /app

COPY package.json package.json

RUN npm install ffmpeg-static
RUN npm install --legacy-peer-deps

COPY . .

RUN node app.js