FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npm run build

FROM node:20

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 3000

COPY start.sh .

RUN chmod +x start.sh

CMD ["./start.sh"]
