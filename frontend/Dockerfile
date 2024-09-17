FROM node:20 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force && npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm run build --prod --verbose
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
