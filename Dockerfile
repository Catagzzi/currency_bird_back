FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["nodemon"]

EXPOSE 3050
