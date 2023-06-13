FROM node:18-alpine

WORKDIR /application/build

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "dev"]



