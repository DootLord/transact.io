FROM node:21-slim

WORKDIR /src
# RUN npm install -g nodemon
COPY package.json .
RUN npm install
EXPOSE 3000
COPY . .
CMD npm run dev