# Stage 1: Build stage
# Use the official Node.js image 
FROM node:20-alpine AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache. This allows dependencies to be installed without copying the entire app code
COPY package*.json ./

# Install all the dependencies, including development dependencies
RUN npm install

# Now, copy the rest of the application code into the container.
COPY . .

# Stage 2: Production stage
# Start with a fresh Node.js image for the production environment
FROM node:20-alpine AS production

# Set the working directory inside the production container to /app
WORKDIR /app

# Copy only the node_modules directory from the build stage into the production container.
COPY --from=build /app/node_modules /app/node_modules

# Copy the application source code from the build stage into the production container.
COPY --from=build /app /app

# Expose port 5173 to make the application accessible from outside the container.
EXPOSE 5173

# In this case, it will start the application in development mode using npm.
CMD ["npm", "run", "dev"]
