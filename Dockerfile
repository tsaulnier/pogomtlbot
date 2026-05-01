FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --build-from-source
COPY . .
CMD ["node", "index.js"]