FROM node:25-alpine AS builder
WORKDIR /task-canvas/frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:25-alpine
WORKDIR /task-canvas/frontend
COPY --from=builder /task-canvas/frontend/.next ./.next
COPY --from=builder /task-canvas/frontend/public ./public
COPY package.json package-lock.json ./
RUN npm install --production
CMD ["npm", "run", "start"]