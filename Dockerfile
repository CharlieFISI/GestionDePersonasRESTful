FROM node:18-bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3030

CMD [ "npm", "start" ]
