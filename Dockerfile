# Build step #1: build the React front end
FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY ./public ./public
COPY ./src ./src
RUN npm install --legacy-peer-deps
CMD npm start

