FROM node:12.20.0-alpine3.12

WORKDIR /opt
COPY package.json /opt
COPY tsconfig.json /opt

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start"]