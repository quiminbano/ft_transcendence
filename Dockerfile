# syntax=docker/dockerfile:1

FROM node:bookworm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm i --save-dev @swc/cli @swc/core
CMD ["npm", "run", "start:debug", "-b", "swc"]
EXPOSE 3000
