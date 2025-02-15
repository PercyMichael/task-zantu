# Docker Setup Guide

## 📌 Overview

This project is a containerized application using Docker with the following services:

- **PHP** – Runs the Laravel backend
- **Laravel** – PHP framework for backend development
- **React** – JavaScript library for frontend development
- **MySQL** – Database management system
- **NPM** – Node.js package manager for frontend dependencies
- **phpMyAdmin** – Web-based MySQL database management tool

### 3️⃣ Build and Start Containers Once

```bash
docker-compose build
docker-compose up
docker-compose exec backend php artisan migrate
```

### 4️⃣ Access Services

- **Frontend**: [`http://localhost:8080`](http://localhost:8080)
- **Backend API**: [`http://localhost:8000`](http://localhost:8000)
