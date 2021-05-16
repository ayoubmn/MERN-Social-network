FROM node:14
WORKDIR /app
ADD . /app
RUN npm install
WORKDIR /app/client
RUN npm install
WORKDIR /app
EXPOSE 3000
CMD npm run dev
