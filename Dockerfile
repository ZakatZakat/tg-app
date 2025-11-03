## Build from repo root context
FROM node:23-alpine AS build
WORKDIR /app/tg-miniapp

COPY tg-miniapp/package*.json ./
COPY packages/client /app/packages/client
RUN npm i --no-audit --no-fund

COPY tg-miniapp ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/tg-miniapp/dist /usr/share/nginx/html
COPY tg-miniapp/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
