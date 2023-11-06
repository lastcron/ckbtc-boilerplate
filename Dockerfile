FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c","npm run build; npx prisma migrate deploy --preview-feature  ; npm prisma generate ; npm prisma db seed ; npm start"]