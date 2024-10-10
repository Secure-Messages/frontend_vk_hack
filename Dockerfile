FROM node:22-alpine

WORKDIR /app

EXPOSE 3000

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean --force

COPY . .

RUN yarn build

CMD ["yarn", "start"]
