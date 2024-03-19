FROM node

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

CMD ["node", "app.js"]