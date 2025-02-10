FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --production

RUN npm run db:migrate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]