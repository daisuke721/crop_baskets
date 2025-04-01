FROM nginx:alpine

# 環境変数を展開するためのテンプレートコピー
COPY default.conf.template /etc/nginx/templates/default.conf.template

# 起動時にテンプレートを展開してから起動
CMD envsubst '${NGINX_PORT} ${NGINX_SERVER_NAME} ${BACKEND_HOST}' \
  < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
  nginx -g 'daemon off;'
