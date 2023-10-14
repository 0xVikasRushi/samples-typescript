FROM node:18

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/* 

WORKDIR  /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
ENV DB_USER=postgres
ENV DB_HOST=postgre
ENV DB_PASSWORD=postgress
ENV DB_PORT=5432
ENV DB_NAME=postgres-keploy-db

RUN npm run build

CMD ["npm", "run", "start"]

