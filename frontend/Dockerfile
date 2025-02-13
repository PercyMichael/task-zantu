FROM node:latest

WORKDIR /app

# Create a new Vite + Vue project
RUN npm create vite@latest . -- --template vue

# Install dependencies
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host"]