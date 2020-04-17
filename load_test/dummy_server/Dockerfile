FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY *.js .

EXPOSE 7070

CMD [ "npm", "start" ]