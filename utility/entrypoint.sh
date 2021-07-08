#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8081:80 -e API_URL="http://localhost:8000" -e SERVER_NAME="localhost"
# Author: Marcelo Maia
set -xe
  : "${API_URL?Precisa do parametro API_URL}"

set -xe
  : "${SAFI_EQUIPAMENTOS_API_URL?Precisa do parametro SAFI_EQUIPAMENTOS_API_URL}"

set -xe
  : "${SERVER_NAME?Precisa do parametro SERVER_NAME}"


sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,SAFI_EQUIPAMENTOS_URL_REPLACE_ME,$SAFI_EQUIPAMENTOS_API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,SERVER_NAME,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf

exec "$@"