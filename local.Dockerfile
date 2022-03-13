FROM node:12.13-alpine

WORKDIR /usr/src/getir-challenge

ADD . ./

COPY .envsample ./.env

RUN yarn install

EXPOSE 4420
CMD ["yarn", "prod"]