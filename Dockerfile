FROM node:14.21-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./src/package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY ./src .

CMD [ "node", "pingconfig.js" ]
