FROM node:latest as build

RUN apt-get update

RUN mkdir /matcha_front
WORKDIR /matcha_front

COPY package.json /matcha_front/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

COPY . /matcha_front

CMD ["ng", "serve", "--prod", "--host", "0.0.0.0"]
