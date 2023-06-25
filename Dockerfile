FROM node:14

WORKDIR /postgres

COPY package.json .
COPY package-lock.json .
COPY src/DB/models/tables.js .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
