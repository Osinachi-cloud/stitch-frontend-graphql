FROM node:18.10.0-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install -g @angular/cli
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html