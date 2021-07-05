# FROM node:12-alpine as build
# WORKDIR /app
# COPY ./AstralFrontend/package.json ./
# COPY ./AstralFrontend/package-lock.json ./
# # COPY package.json /app/package.json
# RUN rm -rf node_modules package-lock.json && npm install
# # RUN npm install --only=production
# COPY . /app
# RUN npm run build
FROM node:13.12.0 as build

WORKDIR /app
COPY ./AstralFrontend/package.json ./
COPY ./AstralFrontend/package-lock.json ./
RUN npm install
COPY ./AstralFrontend ./
RUN npm run build

FROM nginx:1.16.0
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]