# Online Shop 🛍️ for Hackathon Phase 1
[![Stars](https://img.shields.io/github/stars/iemafzalhassan/online_shop)](https://github.com/iemafzalhassan/online_shop)
![Forks](https://img.shields.io/github/forks/iemafzalhassan/online_shop)
![GitHub last commit](https://img.shields.io/github/last-commit/iemafzalhassan/easyshop?color=red)
[![GitHub Profile](https://img.shields.io/badge/GitHub-iemafzalhassan-blue?logo=github&style=flat)](https://github.com/iemafzalhassan)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
<p align="center">

## Overview

This repository contains my submission for **Hackathon Phase 1**, focusing on Dockerization, Nginx configuration, Linux operations, and debugging networking issues in Docker. My work is presented in the `submit/hackathon-phase-1` branch, where I have structured the application for deployment in a containerized environment.

## Table of Contents
- [Important Dates](#important-dates)
- [Overview](#overview)
- [Guidelines & Resources](#guidelines--resources)
- [Tasks](#tasks)
- [Submission Instructions](#submission-instructions)
- [Submission Details for Your Repo README](#submission-details-for-your-repo-readme)
- [Evaluation Criteria](#evaluation-criteria)
- [License](#license)
- [Contact](#contact)

---
##  Why We Use These Technologies?  

### **Docker & Multi-Stage Build**  
We use **Docker** to containerize the application for consistency across different environments.  
 **Why Multi-Stage Build?**  
- Reduces **image size** by removing unnecessary dependencies  
- Improves **build speed** by using separate stages for dependencies and final build  
- Enhances **security** by keeping production images clean  

###  **Nginx as a Static Server**  
Instead of using Node.js to serve static assets, we use **Nginx** for better performance.  
 **Why Nginx?**  
- **Faster than Node.js** for serving static files  
- **Reduces server load**, improving scalability  
- **Security best practices**, handling HTTPS & reverse proxy  

###  **Node.js for Backend**  
The backend of this project is built on **Node.js** because:  
- It provides **event-driven architecture** for handling multiple requests efficiently  
- It works well with **Nginx** as a reverse proxy  
- Compatible with **JavaScript-based frontend frameworks**  

---

## Work Done


### **1. Dockerizing the Application**

I created a **multi-stage Dockerfile** to build and serve the React-based Online Shop application efficiently. The approach includes:

- **Stage 1: Build Phase**
  - `FROM node:18-alpine AS builder .`  Using lightweight Node.js image for building the application
  - `WORKDIR /app .`  Set working directory inside the container
  - `COPY package.json package-lock.json ./ .`  Copy package.json
  - `RUN npm install --frozen-lockfile .`  package-lock.json to install dependencies
  - `COPY . . .`  Copy all source code to the working directory
  - `RUN npm run build` Build the React application

- **Stage 2: Serve with Nginx**
  - `FROM nginx:alpine` Using Nginx for serving the built application
  - `COPY --from=builder /app/dist /usr/share/nginx/html` Copying built application from build stage
  - `EXPOSE 80` Exposing port 80 for HTTP access
  - `CMD ["nginx", "-g", "daemon off;"]` Starting Nginx server

### **Docker Commands Used:**

#### **Container Management**

- `docker build -t online-shop .`  Build image named 'online-shop'
- `docker run -d -p 3000:80 online-shop` - Run container in background, map ports
- `docker ps` - List running containers
- `docker logs <container_id>` - View container logs
- `docker inspect <container_id>` -  - Show detailed container information

#### **Cleanup Commands**

- `docker stop $(docker ps -aq)` - Stop all containers
- `docker rm $(docker ps -aq)` - Remove all containers
- `docker images` - List all images
- `docker rmi <image_id>` - Remove specific image
- `docker system prune -f` - Remove unused data

### **Git Commands**

#### **Branch Operations**

- `git checkout -b <new-branch-name>` - Create and switch to new branch
- `git checkout <branch-name>` - Switch to existing branch
- `git branch` - List branches

#### **Code Management**

- `git add .` - Stage all changes
- `git add <filename>` - Stage specific file
- `git commit -m "commit message"` - Commit staged changes
- `git push origin <branch-name>` - Push commits to remote repository

## How to Run the Dockerized Application

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/atifjaved242/online_shop.git
   cd online-shop
   ```

2. **Build the Docker Image:**

   ```bash
   docker build -t atifjaved242/online-shop:v1 .
   ```

3. **Run the Container:**

   ```bash
   docker run -d -p 3000:80 --name online-shop atifjaved242/online-shop:v1
   ```

4. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

DockerHub Image Link
[DockerHub Image Link](https://hub.docker.com/r/atifjaved242/online-shop)


Contributors
Atif Javed – DevOps Engineer & Hackathon Participant
GitHub: AtifJaved242


If you like this project, don't forget to ⭐ star the repo and contribute! 🚀


---

### **🎯 What This README Covers?**  
✅ **Project Overview & Technologies**  
✅ **Why Multi-Stage Build & Nginx?**  
✅ **How to Setup & Run Locally?**  
✅ **Dockerization & Deployment**  
✅ **Git Best Practices & Contribution Guide**  
✅ **Project Structure & Documentation**  







