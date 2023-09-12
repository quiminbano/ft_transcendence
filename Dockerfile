# syntax=docker/dockerfile:1

FROM node:bookworm
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start:debug"]
EXPOSE 3000
