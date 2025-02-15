# stage 1: build stage
FROM php:8.3-fpm-alpine as build

# Update package list and install dependencies
RUN apk add --no-cache \
    build-base \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    bash \
    fcgi \
    libmcrypt-dev \
    oniguruma-dev \
    mysql-client \
    mysql-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath opcache

# Install Composer
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www/html/

# Set ownership and permissions for the /var/www/html directory to www-data
RUN chown -R www-data:www-data /var/www/html/
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache


# Install dependencies
RUN composer install


# Set up environment file
RUN cp .env.example .env && \
    sed -i \
    -e "s/DB_HOST=.*/DB_HOST=db/" \
    -e "s/DB_PORT=.*/DB_PORT=3306/" \
    -e "s/DB_DATABASE=.*/DB_DATABASE=mydb/" \
    -e "s/DB_USERNAME=.*/DB_USERNAME=laravel_user/" \
    -e "s/DB_PASSWORD=.*/DB_PASSWORD=mypassword/" \
    -e "s/SESSION_DRIVER=.*/SESSION_DRIVER=database/" \
    .env

#hiii
# Generate application key
RUN php artisan key:generate

USER www-data

EXPOSE 9000

CMD ["php-fpm"]