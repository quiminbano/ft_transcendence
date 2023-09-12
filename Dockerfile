# syntax=docker/dockerfile:1

FROM node:bookworm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:debug"]
EXPOSE 3000
