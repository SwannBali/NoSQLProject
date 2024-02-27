FROM node:20.10.0-alpine

COPY ./package.json /nosql-back/package.json

WORKDIR /nosql-back

RUN npm i

COPY . /nosql-back

EXPOSE 3333

CMD ["npm", "run", "dev"]
