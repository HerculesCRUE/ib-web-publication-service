FROM nginx:alpine

EXPOSE 80

COPY --chown=nginx:nginx conf.d/ /etc/nginx/conf.d/
COPY --chown=nginx:nginx website/ /usr/share/nginx/html/