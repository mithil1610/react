# Build step #1: build the React front end
FROM node:alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY ./public ./public
COPY ./src ./src
RUN npm install
RUN npm run build

# Build step #2: build an nginx container
FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf