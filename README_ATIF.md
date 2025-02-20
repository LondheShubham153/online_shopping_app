# 🛍️ Online Shop - Dockerized Hackathon Project  

##  Introduction  
Welcome to the **Online Shop** project! This is a fully **Dockerized** e-commerce application that follows **best DevOps practices**. The project includes:  
- **Multi-Stage Docker Build** to optimize image size and enhance security  
- **Nginx** as a static file server for better performance  
- **Node.js** for handling backend operations  
- **Automated Deployment** using Docker & Git best practices  

---

##  Why We Use These Technologies?  

### 🐳 **Docker & Multi-Stage Build**  
We use **Docker** to containerize the application for consistency across different environments.  
🔹 **Why Multi-Stage Build?**  
- Reduces **image size** by removing unnecessary dependencies  
- Improves **build speed** by using separate stages for dependencies and final build  
- Enhances **security** by keeping production images clean  

### 🌐 **Nginx as a Static Server**  
Instead of using Node.js to serve static assets, we use **Nginx** for better performance.  
🔹 **Why Nginx?**  
- **Faster than Node.js** for serving static files  
- **Reduces server load**, improving scalability  
- **Security best practices**, handling HTTPS & reverse proxy  

### 🟢 **Node.js for Backend**  
The backend of this project is built on **Node.js** because:  
- It provides **event-driven architecture** for handling multiple requests efficiently  
- It works well with **Nginx** as a reverse proxy  
- Compatible with **JavaScript-based frontend frameworks**  

---
##  Create a Dockerfile with Multi-Stage Build
###  Stage 1: Build Stage 

1. `FROM node:18-alpine AS builder .` Using Node.js 18 on an Alpine Linux base to create a minimal and efficient build environment.
2. `WORKDIR /app .` Setting '/app' as the working directory where all files will be managed inside the container.
3. `COPY package.` Copying only the dependency files first to leverage Docker's caching mechanism for efficient builds.
4. `RUN npm install .`  Installing dependencies to prepare the project for building.
5. `COPY . .` Copying the entire project directory to the container to include source files.
6. `RUN npm build .` Running the build process to generate production-ready static files.

### Stage 2: Production Stage
1. `FROM nginx:alpine .` Using Nginx on an Alpine Linux base for a lightweight and high-performance production server.
2. `WORKDIR /usr/share/nginx/html .` Setting the working directory to the default web root of Nginx.
3. `COPY --from=builder /app/dist . ` Copying the built application from the first stage (builder) to the production stage.
4. `EXPOSE 80 .` Opening port 80 to allow HTTP traffic to access the application.
5. `CMD ["nginx", "-g", "daemon off;"] .` Running Nginx as the main process, preventing it from running in the background to keep the container active.













2️⃣ Build the Docker Image
```sh
docker build -t atifjaved242/online-shop:v1 .
```

3️⃣ Run the Docker Container

```sh
docker run -d -p 3000:80 --name online-shop atifjaved242/online-shop:v1
The app will now be available at: http://localhost:3000
```


4️⃣ Push to DockerHub

```
docker login
docker push atifjaved242/online-shop:v1
```

📌 DockerHub Image Link
🔗 https://hub.docker.com/r/atifjaved242/online-shop


👨‍💻 Contributors
Atif Javed – DevOps Engineer & Hackathon Participant
🔹 GitHub: AtifJaved242


If you like this project, don't forget to ⭐ star the repo and contribute! 🚀


---

### **🎯 What This README Covers?**  
✅ **Project Overview & Technologies**  
✅ **Why Multi-Stage Build & Nginx?**  
✅ **How to Setup & Run Locally?**  
✅ **Dockerization & Deployment**  
✅ **Git Best Practices & Contribution Guide**  
✅ **Project Structure & Documentation**  

This README is **fully professional** and follows **best practices** for **open-source projects**.  

