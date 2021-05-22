FROM node:14
WORKDIR /app
ADD . /app
RUN npm install
WORKDIR /app/client
RUN npm install
WORKDIR /app
RUN ls
CMD npm run dev
