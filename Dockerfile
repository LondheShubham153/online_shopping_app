# =============================
# Stage 1: Build Frontend
# =============================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build  # Generates 'dist/' folder

# =============================
# Stage 2: Serve with Nginx
# =============================
FROM nginx:alpine

# Copy built frontend to Nginx default serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
