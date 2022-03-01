# just to create `build` directory
FROM node:10.15.3-alpine as builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run-script postinstall
RUN npm run-script build

# replace strings, this way we can pass parameters to static files.
# For more details:
# https://stackoverflow.com/questions/48595829/how-to-pass-environment-variables-to-a-frontend-web-application

FROM nginx:alpine
COPY ./utility/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./utility/coad_nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]