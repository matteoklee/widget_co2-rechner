FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

CMD ["echo", "Build abgeschlossen. Nutze /app/dist zum Serven."]
