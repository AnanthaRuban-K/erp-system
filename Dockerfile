FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy workspace files
COPY apps/frontend/package*.json ./apps/frontend/
COPY apps/frontend/tsconfig*.json ./apps/frontend/

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the frontend
RUN npx nx build frontend

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npx", "nx", "serve", "frontend", "--port=3000", "--host=0.0.0.0"]