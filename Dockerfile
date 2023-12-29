FROM node:18.17.1-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ormconfig.js ./
COPY src ./src

RUN yarn

EXPOSE 5050

CMD ["yarn", "dev"]
