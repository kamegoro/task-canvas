FROM node:24-alpine

WORKDIR /task-canvas/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]