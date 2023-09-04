FROM php:8.2-fpm

WORKDIR "/application"

RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y libzip-dev libpng-dev libjpeg-dev \
  && pecl install -o -f redis \
  && rm -rf /tmp/pear \
  && docker-php-ext-install mysqli pdo pdo_mysql zip exif gd \
  && docker-php-ext-enable redis

COPY --from=composer /usr/bin/composer /usr/bin/composer