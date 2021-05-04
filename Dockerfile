FROM node:alpine

# # create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src/

# Copying source files
COPY . /usr/src/

# Installing dependencies
COPY package*.json .
RUN npm install

# Building app
RUN npm build
EXPOSE 3000

# Start app
RUN npm run build
EXPOSE 3000
CMD npm run start