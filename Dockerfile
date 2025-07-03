FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy workspace configuration
COPY apps/frontend/package*.json ./apps/frontend/
COPY libs/ ./libs/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend application
RUN npx nx build frontend

# Expose port
EXPOSE 3000

# Start the application
CMD ["npx", "nx", "serve", "frontend", "--port=3000", "--host=0.0.0.0"]