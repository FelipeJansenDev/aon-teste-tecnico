FROM node:20.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
COPY . .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]
