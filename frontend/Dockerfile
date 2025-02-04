FROM node:20.9.0-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]
