FROM node:latest

ADD . /code
WORKDIR /code
USER root
RUN apt-get -y update
RUN npm install
RUN npm install -g nodemon