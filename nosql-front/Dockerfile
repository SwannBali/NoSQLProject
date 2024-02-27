FROM node:20.10.0-alpine as build-stage

COPY ./package.json /nosql-front/package.json

WORKDIR /nosql-front

RUN npm i

COPY . /nosql-front

EXPOSE 3000

CMD ["npm", "run", "dev"]

