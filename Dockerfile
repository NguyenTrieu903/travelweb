FROM php:8.3-fpm

ENV DEBIAN_FRONTEND=noninteractive

# Hệ thống + PHP extension + MySQL client
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-utils zip unzip git curl libzip-dev libxml2-dev libonig-dev libicu-dev default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql mbstring bcmath xml intl zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

WORKDIR /var/www
