FROM node:22-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json yarn.lock ./

RUN npm install -g yarn && yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]
