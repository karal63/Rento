FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
COPY client ./client
COPY server ./server

RUN npm ci
RUN npm run build --workspace=client
RUN npm run build --workspace=server

FROM node:20

WORKDIR /app

# Copy server code
COPY --from=builder /app/server ./server

# Copy built client
COPY --from=builder /app/client/dist ./server/public
COPY --from=builder /app/server/dist ./server/dist

# Copy package files (important!)
COPY package*.json ./

ENV NODE_ENV=production
ENV HUSKY=0
RUN npm ci --omit=dev

WORKDIR /app/server

CMD ["node", "dist/main.js"]