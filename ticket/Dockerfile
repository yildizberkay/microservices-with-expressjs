FROM node:14.15-alpine
WORKDIR /usr/src/app
RUN mkdir dist

COPY package.json ./
RUN npm install --only=prod
COPY dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "server" ]
