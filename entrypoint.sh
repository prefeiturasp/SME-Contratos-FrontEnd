#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8081:80 -e API_URL="http://localhost:8000" -e SERVER_NAME="localhost"
# Author: Marcelo Maia
set -xe
  : "${API_URL?Need an api url}"

sed -i "s,http://localhost:8000,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,localhost,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf

exec "$@"