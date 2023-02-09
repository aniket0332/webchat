FROM ubuntu:latest

RUN spt-get -y install nginx

COPY index.html /var/www/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
