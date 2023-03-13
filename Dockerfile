FROM node:14-alpine as builder
WORKDIR /app
COPY . ./
RUN npm install --unsafe-perm --no-cache \
    && npm run-script build 

FROM nginx:alpine
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]