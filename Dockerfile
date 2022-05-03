FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install -g nodemon --silent

COPY . ./

CMD ["nodemon"]

EXPOSE 3050
