# ---- 1. Build client ----
FROM node:20 AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build


# ---- 2. Server runtime ----
FROM node:20

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install --production
COPY server .
COPY --from=client-builder /app/client/dist ./public

EXPOSE 3000
CMD ["npm", "run", "start"]
