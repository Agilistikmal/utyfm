FROM node

RUN apt-get install -y ffmpeg

WORKDIR /app

COPY package.json package.json

RUN npm install --legacy-peer-deps
RUN npm install ffmpeg-static

COPY . .

CMD ["node", "app.js"]