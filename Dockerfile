

FROM node:12.13-alpine

LABEL Victor Oni <seunoni34@gmail.com>

RUN mkdir -p /getir-challenge
RUN mkdir -p /logs 
RUN cd /getir-challenge && rm -rf *

WORKDIR /getir-challenge

ADD package.json /getir-challenge/package.json
ADD yarn.lock /getir-challenge/yarn.lock
RUN yarn install --production
RUN npm install -g pm2

COPY . /beneficiary-service

EXPOSE 4420

CMD pm2 start src/server.js -i max --no-daemon --name app -o /logs/out.log -e /logs/err.log