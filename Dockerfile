FROM node:latest

# install chrome for protractor tests
RUN apt-get update

RUN mkdir /matcha_front
WORKDIR /matcha_front

# install and cache app dependencies
COPY package.json /matcha_front/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

# add app
COPY . /matcha_front

# start app
CMD ng serve --host 0.0.0.0
