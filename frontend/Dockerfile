FROM node:latest

WORKDIR /app

# Create a new Vite + React project inside the container
RUN npm create vite@latest . -- --template react

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host"]