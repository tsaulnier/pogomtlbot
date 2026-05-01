FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci && npm rebuild sqlite3 --build-from-source
COPY . .
CMD ["node", "index.js"]  # or your main file
