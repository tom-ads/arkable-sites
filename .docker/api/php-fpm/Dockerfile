FROM php:8.2-fpm

WORKDIR "/application"

ARG DEBIAN_FRONTEND=nointeractive

RUN apt-get update -y; \
    apt-get -y install zlib1g-dev libpng-dev libzip-dev

RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN docker-php-ext-install gd
RUN docker-php-ext-install zip
RUN docker-php-ext-install exif
RUN docker-php-ext-install pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer