FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Install root dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npx nx build frontend

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npx", "nx", "serve", "frontend", "--port=3000", "--host=0.0.0.0"]