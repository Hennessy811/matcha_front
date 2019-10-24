FROM node:latest as build

RUN apt-get update

RUN mkdir /matcha_front
WORKDIR /matcha_front

COPY package.json /matcha_front/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

COPY . /matcha_front

RUN ng build --prod --output-path=dist


FROM nginx:1.16.0-alpine

COPY --from=build /matcha_front/dist /usr/share/nginx/html
COPY --from=build /matcha_front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

