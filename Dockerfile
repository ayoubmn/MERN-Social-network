FROM node:14
WORKDIR /app
ADD . /app
RUN npm install
WORKDIR /app/client
RUN npm install
RUN npm run build
WORKDIR /app
EXPOSE 3000 5000 3002 8000
