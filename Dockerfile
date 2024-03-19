FROM node:alpine

RUN apk add g++ && apk add make

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD ["node", "app.js"]