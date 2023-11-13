FROM node:18-alpine

WORKDIR /home/app

COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn build
RUN yarn global add prisma

CMD ["sh", "-c","npx prisma migrate deploy --preview-feature  ; npx prisma generate ; npx prisma db seed ; yarn start"]