# Online Shop – Hackathon Phase 1 Submission

## Project Overview
The repository contains a fully functional e-commerce application built to demonstrate foundational DevOps skills in three key areas:

- **Git & GitHub**
- **Linux**
- **Docker**

## Git & GitHub Workflow
I started by forking the repository to obtain a copy in my GitHub home page. Then, I created a feature branch named `featurebranch_online_shop_hackathon` from the source branch `Hackathon`. This branch was used to implement changes and create the Dockerfile.

## Setting Up the Linux Environment
I logged into my AWS EC2 instance (t2.micro instance running Ubuntu Linux) set up with the following AMI:

**AMI:** `ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-20250115`

I connected to the instance using SSH with a `.pem` file and executed the following Linux commands:

```sh
sudo apt-get update  # Updates the package lists for upgrades and new installations
sudo apt-get install docker.io  # Installs Docker on the system
sudo systemctl status docker  # Checks if the Docker service is running
whoami  # Displays the current logged-in user
sudo usermod -aG docker $USER  # Adds the current user to the Docker group to allow running Docker commands without sudo
newgrp docker  # Refreshes the group membership for the current session

docker ps -a  # Lists all Docker containers (running and stopped)
docker login  # Logs into Docker Hub (requires credentials I used access token)
```

## Cloning the Repository
After setting up Docker, I cloned the repository into my EC2 instance:

```sh
pwd  # Prints the current working directory (/home/ubuntu)
mkdir hackathon  # Creates a new directory named 'hackathon'
cd hackathon  # Changes directory to 'hackathon'
git init  # Initializes a new Git repository

git clone -b featurebranch_online_shop_hackathon https://github.com/Yogabhinanda/online_shop_hackathon.git  # Clones the specific branch of the repository

cd online_shop_hackathon  # Navigates into the cloned repository
ls -ltr  # Lists files in the directory with details sorted by modification time
```

## Dockerfile Implementation
After cloning the repository, I started working on the Dockerfile. Initially, I drafted a basic version after analyzing the repository's code to determine the appropriate base image and port configuration.

### Dockerfile (Draft Version)
```Dockerfile
# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install && npm run build

# Now copy the rest of the application files
COPY . .

# Expose the port
# EXPOSE 3000
EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]
```

### Building and Running the Docker Container
```sh
docker build -t yoga1809/online_shop:latest .  # Builds the Docker image and tags it as 'yoga1809/online_shop:latest'

docker run -d -p 3000:5173 yoga1809/online_shop:latest  # Runs the container in detached mode, mapping port 3000 on the host to port 5173 in the container
```

### Debugging and Container Management

To monitor and manage the running container, I used the following commands:

Checking Logs
```sh
docker logs 151afbdd86e9  # Displays the logs for the specified container ID
```
Stopping and Removing the Container
```sh
docker stop 151afbdd86e9 && docker rm 151afbdd86e9  # Stops and removes the container using its ID
```
Removing the Docker Image
```sh
docker rmi yoga1809/online_shop_hackathon:latest  # Removes the specified Docker image
```

## Key Changes & Enhancements: Debugging & Port Correction
After launching the container, I accessed it using `docker exec` and ran the `netstat` command to inspect the open ports. Based on the findings, I modified the Dockerfile to correctly expose port `5173` instead of `3000`.

## Key Changes & Enhancements: Docker Multi-Stage Optimization

After confirming the initial Dockerfile worked as expected, I focused on optimizing it using a multi-stage build approach to enhance efficiency and reduce the final image size.

Running a container as the root user essentially grants root privileges on the Docker host as well. If an attacker manages to gain access to my container, they would have full root access and could launch attacks on the Docker host. For this reason, I make it a point to configure my containers to run as a non-root user to minimize security risks.

## Optimized Dockerfile with Multi-Stage Build

```sh
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

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the production container to /app
WORKDIR /app

# Copy only the node_modules directory from the build stage into the production container.
COPY --from=build /app/node_modules /app/node_modules

# Copy the application source code from the build stage into the production container.
COPY --from=build /app /app

RUN chown -R appuser:appgroup /app

USER appuser

# Expose port 5173 to make the application accessible from outside the container.
EXPOSE 5173

# In this case, it will start the application in development mode using npm.
CMD ["npm", "run", "dev"]
```
## Benefits of Multi-Stage Builds

Reduces the final image size by eliminating unnecessary dependencies from the production image.

Improves security by ensuring only the necessary files are included in the final image.

Enhances efficiency by leveraging Docker caching for dependencies.

## Pushing the Docker Image to Docker Hub

After building the Docker image, it can be pushed to Docker Hub for sharing and deployment.

### Steps to Push the Image:

Ensure you are logged into Docker Hub:
```sh
docker login  # Logs into Docker Hub 
```
Tag the Image Properly:
```sh
docker tag yoga1809/online_shop:latest yoga1809/online_shop_hackathon:v1.0  # Tags the image 
```
Push the Image to Docker Hub:
```sh
docker push yoga1809/online_shop_hackathon:v1.0  # Pushes the tagged image to Docker Hub
```
### Verifying the Image on Docker Hub

After pushing, the image can be checked on Docker Hub by visiting: Docker Hub - yoga1809

## Docker Compose Implementation

To simplify container management, I created a Docker Compose file.

docker-compose.yml
```sh
version: '3.8'
services:
  online_shop:
    image: yoga1809/online_shop_hackathon:latest
    ports:
      - "3000:5173"
    restart: always
```

## Commands to Run Docker Compose


```sh
docker-compose up -d  # Starts the container in detached mode
docker-compose ps  # Lists running containers
docker-compose logs -f  # Follows the logs for debugging
docker-compose down  # Stops and removes the container
```

## Final Submission Statement

This repository represents my final submission for Hackathon Phase 1.

GitHub Repository :
https://github.com/Yogabhinanda/online_shop_hackathon/tree/featurebranch_online_shop_hackathon

Branch: featurebranch_online_shop_hackathon

Image: https://hub.docker.com/r/yoga1809/online_shop_hackathon
(docker pull yoga1809/online_shop_hackathon)

## Conclusion

This project  integrates Git & GitHub, Linux, and Docker skills to deploy a functional e-commerce application. The workflow demonstrates best practices in version control, server setup, and containerization techniques essential for modern DevOps practices. Additionally, the implementation of a multi-stage Docker build optimizes performance and enhances security.
