FROM node:22-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV PORT=3000
EXPOSE 3000
ENV HOST="0.0.0.0"

CMD ["npm", "start"]
