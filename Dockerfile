# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and Nx configuration
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application (adjust target as needed)
RUN npx nx build frontend

# Expose port
EXPOSE 3000

# Start the application
CMD ["npx", "nx", "serve", "frontend", "--host", "0.0.0.0"]