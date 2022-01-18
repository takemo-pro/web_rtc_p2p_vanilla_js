FROM php:7.4-fpm-buster
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ENV COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

#php
RUN apt-get update && \
  apt-get -y install vim git unzip libzip-dev libicu-dev libonig-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  docker-php-ext-install intl pdo_mysql zip bcmath gd && \
  echo "alias pa='php artisan'" >> ~/.bashrc

#npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

#bashrc
RUN echo "alias pa='php artisan'" >> ~/.bashrc && \
    echo "alias unit='./vendor/bin/phpunit'" >> ~/.bashrc


#php.ini
COPY ./php.ini /usr/local/etc/php/php.ini

#curl
COPY ./cacert.pem /usr/local/etc/openssl@1.1/cert.pem

WORKDIR /work