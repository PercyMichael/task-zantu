FROM php:8.3.11-fpm-alpine

WORKDIR /var/www

# Install dependencies
RUN apk add --no-cache \
    git \
    unzip \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    icu-dev \
    oniguruma-dev \
    shadow \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd pdo pdo_mysql opcache intl mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory for Laravel
WORKDIR /var/www/html

# Copy the application code
COPY . .

# Install dependencies via Composer
RUN composer install --no-dev --optimize-autoloader

# Expose PHP-FPM port (9000)
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]