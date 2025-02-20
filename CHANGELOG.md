# Ìªç Online Shop Hackathon

This repository contains the **Online Shop Frontend**, containerized and deployed using **Docker**, **Node.js**, and **Nginx**.

---

## Ì≥å Project Overview

The objective of this project was to:

- **Containerize** the frontend application using **Docker**.
- **Serve** the built frontend using **Nginx**.
- **Deploy the project on EC2** for cloud hosting.
- **Manage container processes (Optional)** using **systemd**.

---

## Ìø∑ Steps to Set Up and Deploy

### **1Ô∏è‚É£ Clone the Repository**

Start by cloning the **forked repository** from GitHub:

```sh
git clone https://github.com/Kisalaykisu/online_shop_hackathon.git
cd online_shop_hackathon
```

---

### **2Ô∏è‚É£ Install Dependencies**

Before building the application, install the necessary dependencies:

```sh
npm install
```

---

### **3Ô∏è‚É£ Build the Frontend**

Generate the production-ready **`dist/`** folder:

```sh
npm run build
```

---

### **4Ô∏è‚É£ Create a Multi-Stage Dockerfile**

A **multi-stage** `Dockerfile` is used to:

- **Stage 1:** Build the frontend using a **Node.js Alpine** container.
- **Stage 2:** Copy the built assets to an **Nginx Alpine** container for serving static files.

#### **Dockerfile**
```dockerfile
# Stage 1: Build frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build  # Generates 'dist/' folder

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

### **5Ô∏è‚É£ Build the Docker Image**

Create a Docker image named `online-shop`:

```sh
docker build -t online-shop .
```

---

### **6Ô∏è‚É£ Run the Docker Container**

To start the container:

```sh
docker run -d -p 3000:80 --name online-shop online-shop
```

If you encounter a **name conflict**, remove the previous container:

```sh
docker rm -f online-shop
```

Then, run the container again.

---

### **7Ô∏è‚É£ Check if the Application is Running**

Test whether the application is accessible:

```sh
curl http://localhost:3000
```

or for an EC2 instance:

```sh
curl http://your-ec2-public-ip:3000
```

---

### **8Ô∏è‚É£ (Optional) Manage with systemd**

To ensure the container **restarts automatically**, a **systemd service** can be created.

#### **Create a systemd service file**
```sh
sudo nano /etc/systemd/system/online-shop.service
```

#### **Service File Content**
```ini
[Unit]
Description=Online Shop Frontend
After=network.target

[Service]
ExecStart=/usr/bin/docker run -d --rm -p 3000:80 --name online-shop online-shop
ExecStop=/usr/bin/docker stop online-shop
Restart=always

[Install]
WantedBy=multi-user.target
```

#### **Enable and Start the Service**
```sh
sudo systemctl daemon-reload
sudo systemctl enable online-shop
sudo systemctl start online-shop
```

To check the status:

```sh
sudo systemctl status online-shop
```

---

## ÌæØ What I Learned

During this project, I gained experience with:

- **Git & GitHub**: Cloning repositories, tracking changes, and pushing updates.
- **Node.js**: Installing dependencies and building a frontend project.
- **Docker**: Writing a multi-stage **Dockerfile**, building images, and running containers.
- **Nginx**: Serving static frontend files inside a minimal **Alpine Linux** container.
- **EC2 Deployment**: Running a containerized app on an AWS EC2 instance.
- **systemd (Optional)**: Automating container startup and ensuring persistence.

---

## Ì∫Ä Running the Project

If the container is already running, restart it:

```sh
docker restart online-shop
```

To stop the container:

```sh
docker stop online-shop
```

To remove all containers:

```sh
docker rm -f $(docker ps -aq)
```

---

## Ì¥Ñ **Pushing Changes to GitHub and Creating a Pull Request**

### **1Ô∏è‚É£ Configure Git Remote**
Check if your repository is correctly set up:

```sh
git remote -v
```

If needed, set the remote URL:
```sh
git remote set-url origin git@github.com:your-username/online_shop_hackathon.git
```

---

### **2Ô∏è‚É£ Create a New Feature Branch**
Create and switch to a new branch for your changes:

```sh
git checkout -b feature/devops-enhancements
```

---

### **3Ô∏è‚É£ Add and Commit Changes**
Track all modified files and commit them using a **conventional commit message**:

```sh
git add .
git commit -m "feat: containerized frontend and added systemd service"
```

---

### **4Ô∏è‚É£ Push the Branch to GitHub**
Push the changes to your forked repository:

```sh
git push origin feature/devops-enhancements
```

---

### **5Ô∏è‚É£ Create a Pull Request**
1. **Go to the original GitHub repository**:  
   Ì±â [https://github.com/Kisalaykisu/online_shop_hackathon](https://github.com/Kisalaykisu/online_shop_hackathon)

2. **Click on "Compare & pull request".**

3. **Add a meaningful title** and description explaining the changes.

4. **Submit the pull request (PR)** for review.

---

## Ì¥Ñ **Final Steps for PR Merge**
1. **Ensure your README.md is updated** with relevant changes.
2. **Update the `CHANGELOG.md`** following the existing format.
3. **Wait for a maintainer to review and approve the PR** before it gets merged.

---

### Ìæâ **Now, the online shop frontend is fully Dockerized and deployed successfully on EC2!!!!** Ì∫ÄÌæØ

# Ìªç Online Shop Hackathon

This repository contains the **Online Shop Frontend**, containerized and deployed using **Docker**, **Node.js**, and **Nginx**.

---

## Ì≥å Project Overview

The objective of this project was to:

- **Containerize** the frontend application using **Docker**.
- **Serve** the built frontend using **Nginx**.
- **Deploy the project on EC2** for cloud hosting.
- **Manage container processes (Optional)** using **systemd**.

---

## Ìø∑ Steps to Set Up and Deploy

### **1Ô∏è‚É£ Clone the Repository**

Start by cloning the **forked repository** from GitHub:

```sh
git clone https://github.com/Kisalaykisu/online_shop_hackathon.git
cd online_shop_hackathon
```

---

### **2Ô∏è‚É£ Install Dependencies**

Before building the application, install the necessary dependencies:

```sh
npm install
```

---

### **3Ô∏è‚É£ Build the Frontend**

Generate the production-ready **`dist/`** folder:

```sh
npm run build
```

---

### **4Ô∏è‚É£ Create a Multi-Stage Dockerfile**

A **multi-stage** `Dockerfile` is used to:

- **Stage 1:** Build the frontend using a **Node.js Alpine** container.
- **Stage 2:** Copy the built assets to an **Nginx Alpine** container for serving static files.

#### **Dockerfile**
```dockerfile
# Stage 1: Build frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build  # Generates 'dist/' folder

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

### **5Ô∏è‚É£ Build the Docker Image**

Create a Docker image named `online-shop`:

```sh
docker build -t online-shop .
```

---

### **6Ô∏è‚É£ Run the Docker Container**

To start the container:

```sh
docker run -d -p 3000:80 --name online-shop online-shop
```

If you encounter a **name conflict**, remove the previous container:

```sh
docker rm -f online-shop
```

Then, run the container again.

---

### **7Ô∏è‚É£ Check if the Application is Running**

Test whether the application is accessible:

```sh
curl http://localhost:3000
```

or for an EC2 instance:

```sh
curl http://your-ec2-public-ip:3000
```

---

### **8Ô∏è‚É£ (Optional) Manage with systemd**

To ensure the container **restarts automatically**, a **systemd service** can be created.

#### **Create a systemd service file**
```sh
sudo nano /etc/systemd/system/online-shop.service
```

#### **Service File Content**
```ini
[Unit]
Description=Online Shop Frontend
After=network.target

[Service]
ExecStart=/usr/bin/docker run -d --rm -p 3000:80 --name online-shop online-shop
ExecStop=/usr/bin/docker stop online-shop
Restart=always

[Install]
WantedBy=multi-user.target
```

#### **Enable and Start the Service**
```sh
sudo systemctl daemon-reload
sudo systemctl enable online-shop
sudo systemctl start online-shop
```

To check the status:

```sh
sudo systemctl status online-shop
```

---

## ÌæØ What I Learned

During this project, I gained experience with:

- **Git & GitHub**: Cloning repositories, tracking changes, and pushing updates.
- **Node.js**: Installing dependencies and building a frontend project.
- **Docker**: Writing a multi-stage **Dockerfile**, building images, and running containers.
- **Nginx**: Serving static frontend files inside a minimal **Alpine Linux** container.
- **EC2 Deployment**: Running a containerized app on an AWS EC2 instance.
- **systemd (Optional)**: Automating container startup and ensuring persistence.

---

## Ì∫Ä Running the Project

If the container is already running, restart it:

```sh
docker restart online-shop
```

To stop the container:

```sh
docker stop online-shop
```

To remove all containers:

```sh
docker rm -f $(docker ps -aq)
```

---

## Ì¥Ñ **Pushing Changes to GitHub and Creating a Pull Request**

### **1Ô∏è‚É£ Configure Git Remote**
Check if your repository is correctly set up:

```sh
git remote -v
```

If needed, set the remote URL:
```sh
git remote set-url origin git@github.com:your-username/online_shop_hackathon.git
```

---

### **2Ô∏è‚É£ Create a New Feature Branch**
Create and switch to a new branch for your changes:

```sh
git checkout -b feature/devops-enhancements
```

---

### **3Ô∏è‚É£ Add and Commit Changes**
Track all modified files and commit them using a **conventional commit message**:

```sh
git add .
git commit -m "feat: containerized frontend and added systemd service"
```

---

### **4Ô∏è‚É£ Push the Branch to GitHub**
Push the changes to your forked repository:

```sh
git push origin feature/devops-enhancements
```

---

### **5Ô∏è‚É£ Create a Pull Request**
1. **Go to the original GitHub repository**:  
   Ì±â [https://github.com/Kisalaykisu/online_shop_hackathon](https://github.com/Kisalaykisu/online_shop_hackathon)

2. **Click on "Compare & pull request".**

3. **Add a meaningful title** and description explaining the changes.

4. **Submit the pull request (PR)** for review.

---

## Ì¥Ñ **Final Steps for PR Merge**
1. **Ensure your README.md is updated** with relevant changes.
2. **Update the `CHANGELOG.md`** following the existing format.
3. **Wait for a maintainer to review and approve the PR** before it gets merged.

---

### Ìæâ **Now, the online shop frontend is fully Dockerized and deployed successfully on EC2!!!!** Ì∫ÄÌæØ

# Ìªç Online Shop Hackathon

This repository contains the **Online Shop Frontend**, containerized and deployed using **Docker**, **Node.js**, and **Nginx**.

---

## Ì≥å Project Overview

The objective of this project was to:

- **Containerize** the frontend application using **Docker**.
- **Serve** the built frontend using **Nginx**.
- **Deploy the project on EC2** for cloud hosting.
- **Manage container processes (Optional)** using **systemd**.

---

## Ìø∑ Steps to Set Up and Deploy

### **1Ô∏è‚É£ Clone the Repository**

Start by cloning the **forked repository** from GitHub:

```sh
git clone https://github.com/Kisalaykisu/online_shop_hackathon.git
cd online_shop_hackathon
```

---

### **2Ô∏è‚É£ Install Dependencies**

Before building the application, install the necessary dependencies:

```sh
npm install
```

---

### **3Ô∏è‚É£ Build the Frontend**

Generate the production-ready **`dist/`** folder:

```sh
npm run build
```

---

### **4Ô∏è‚É£ Create a Multi-Stage Dockerfile**

A **multi-stage** `Dockerfile` is used to:

- **Stage 1:** Build the frontend using a **Node.js Alpine** container.
- **Stage 2:** Copy the built assets to an **Nginx Alpine** container for serving static files.

#### **Dockerfile**
```dockerfile
# Stage 1: Build frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build  # Generates 'dist/' folder

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

### **5Ô∏è‚É£ Build the Docker Image**

Create a Docker image named `online-shop`:

```sh
docker build -t online-shop .
```

---

### **6Ô∏è‚É£ Run the Docker Container**

To start the container:

```sh
docker run -d -p 3000:80 --name online-shop online-shop
```

If you encounter a **name conflict**, remove the previous container:

```sh
docker rm -f online-shop
```

Then, run the container again.

---

### **7Ô∏è‚É£ Check if the Application is Running**

Test whether the application is accessible:

```sh
curl http://localhost:3000
```

or for an EC2 instance:

```sh
curl http://your-ec2-public-ip:3000
```

---

### **8Ô∏è‚É£ (Optional) Manage with systemd**

To ensure the container **restarts automatically**, a **systemd service** can be created.

#### **Create a systemd service file**
```sh
sudo nano /etc/systemd/system/online-shop.service
```

#### **Service File Content**
```ini
[Unit]
Description=Online Shop Frontend
After=network.target

[Service]
ExecStart=/usr/bin/docker run -d --rm -p 3000:80 --name online-shop online-shop
ExecStop=/usr/bin/docker stop online-shop
Restart=always

[Install]
WantedBy=multi-user.target
```

#### **Enable and Start the Service**
```sh
sudo systemctl daemon-reload
sudo systemctl enable online-shop
sudo systemctl start online-shop
```

To check the status:

```sh
sudo systemctl status online-shop
```

---

## ÌæØ What I Learned

During this project, I gained experience with:

- **Git & GitHub**: Cloning repositories, tracking changes, and pushing updates.
- **Node.js**: Installing dependencies and building a frontend project.
- **Docker**: Writing a multi-stage **Dockerfile**, building images, and running containers.
- **Nginx**: Serving static frontend files inside a minimal **Alpine Linux** container.
- **EC2 Deployment**: Running a containerized app on an AWS EC2 instance.
- **systemd (Optional)**: Automating container startup and ensuring persistence.

---

## Ì∫Ä Running the Project

If the container is already running, restart it:

```sh
docker restart online-shop
```

To stop the container:

```sh
docker stop online-shop
```

To remove all containers:

```sh
docker rm -f $(docker ps -aq)
```

---

## Ì¥Ñ **Pushing Changes to GitHub and Creating a Pull Request**

### **1Ô∏è‚É£ Configure Git Remote**
Check if your repository is correctly set up:

```sh
git remote -v
```

If needed, set the remote URL:
```sh
git remote set-url origin git@github.com:your-username/online_shop_hackathon.git
```

---

### **2Ô∏è‚É£ Create a New Feature Branch**
Create and switch to a new branch for your changes:

```sh
git checkout -b feature/devops-enhancements
```

---

### **3Ô∏è‚É£ Add and Commit Changes**
Track all modified files and commit them using a **conventional commit message**:

```sh
git add .
git commit -m "feat: containerized frontend and added systemd service"
```

---

### **4Ô∏è‚É£ Push the Branch to GitHub**
Push the changes to your forked repository:

```sh
git push origin feature/devops-enhancements
```

---

### **5Ô∏è‚É£ Create a Pull Request**
1. **Go to the original GitHub repository**:  
   Ì±â [https://github.com/Kisalaykisu/online_shop_hackathon](https://github.com/Kisalaykisu/online_shop_hackathon)

2. **Click on "Compare & pull request".**

3. **Add a meaningful title** and description explaining the changes.

4. **Submit the pull request (PR)** for review.

---

## Ì¥Ñ **Final Steps for PR Merge**
1. **Ensure your README.md is updated** with relevant changes.
2. **Update the `CHANGELOG.md`** following the existing format.
3. **Wait for a maintainer to review and approve the PR** before it gets merged.

---

### Ìæâ **Now, the online shop frontend is fully Dockerized and deployed successfully on EC2!!!!** Ì∫ÄÌæØ

