# ===== Stage 1: Build the React App =====
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the React application
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:alpine

# Copy the built React files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


