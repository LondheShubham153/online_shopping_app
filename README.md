# Online Shop 🛍️ for Hackathon Phase 1
[![Stars](https://img.shields.io/github/stars/iemafzalhassan/online_shop)](https://github.com/iemafzalhassan/online_shop)
![Forks](https://img.shields.io/github/forks/iemafzalhassan/online_shop)
![GitHub last commit](https://img.shields.io/github/last-commit/iemafzalhassan/easyshop?color=red)
[![GitHub Profile](https://img.shields.io/badge/GitHub-iemafzalhassan-blue?logo=github&style=flat)](https://github.com/iemafzalhassan)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
<p align="center">

Welcome to the **Online Shop** project – our hackathon entry for Phase 1! This repository contains a fully functional e-commerce application built to demonstrate foundational DevOps skills in three key areas:
- **Git & GitHub**
- **Linux**
- **Docker**

In this phase, your focus is on understanding the provided developer code, reviewing how these core topics are implemented, and making any necessary enhancements. When you're ready, you'll submit your work via our designated Google Form.

---

## Important Dates

- **Hackathon Start Date:** 20th Feb, 9:00 AM
- **Hackathon End Date:** 21st Feb, 9:00 AM
- **Submission Deadline:** 24 hours after the repository link is shared

---

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

## Overview

The **Online Shop** project is a demo e-commerce application designed for Hackathon Phase 1. It serves as a platform to showcase best practices in code quality, development workflows, and system design with a focus on:

- **Git & GitHub:** Effective version control, branching strategies, and collaborative workflows.
- **Linux:** Command-line operations, system administration, and file management.
- **Docker:** Principles of containerization and preparing code for deployment in a containerized environment.

Your task is to familiarize yourself with the code, make enhancements if necessary, and ensure your final submission reflects your understanding of these topics.

---
## 🛠️ Implementation Details

### 🔧 Git & GitHub Operations

- **Repository Management:**
  - **Forked** the repository and **cloned** it locally.
  - Created a feature branch `feature/docker-integration` to isolate enhancements.
  
  ```bash
  -git clone https://github.com/dvharsh/online_shop_hackathon.git
  -cd online_shop_hackathon
  -git checkout -b feature/docker-integration

### Environment Setup & Dependency Installation:

### Installed project dependencies:

-npm install

### Version Control & Collaboration:

-Maintained a clean commit history using descriptive messages:

-git add .
-git commit -m "feat: initial setup and dependency installation"
-git push origin feature/docker-integration
-Created Pull Requests for code reviews and future merging.

### Vite Configuration:

- Updated vite.config.js to set the development server’s host and port:

-import { defineConfig } from 'vite';
-import react from '@vitejs/plugin-react';

-export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',  // Accessible externally 🌐
    port: 5173,
    strictPort: true,
  },
  css: {
    devSourcemap: false,
  },
});


### 🐧 Linux Environment & Optimizations

--File Permissions:
-Updated file permissions for enhanced security:

-chmod -R 755 public src node_modules
-chmod 644 package.json vite.config.js index.html README.md CONTRIBUTING.md LICENSE ROADMAP.md

--Command-Line Proficiency:
- Verified file operations (e.g., ls, mv, cp) and ensured proper functioning of system scripts.


-- Process Management with PM2:
- Installed and configured PM2 to run the application in the background:
- sudo npm install -g pm2
- pm2 start "npm run dev" --name online-shop
- pm2 save
- pm2 startup

This setup ensures the application remains running even after closing the terminal.

## ⚛️ Vite/React Configuration
-The application is built using Vite and React.
-The build process outputs the production-ready files into a dist folder, which are later served by Nginx in the Docker container.


### 🐳 Docker Containerization
-.dockerignore File:

-Created a .dockerignore file to exclude unnecessary files from the build context:

-dockerignore
node_modules
.git
dist
*.log
Dockerfile
.dockerignore

-- Implemented a multi-stage Dockerfile to build the app and serve it using Nginx:

# Stage 1: Build the application using Node 18
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


### Docker Compose Configuration:

-- Developed a docker-compose.yml file to manage container settings including port mapping, healthchecks, and volume for backup:

version: "3.8"
services:
  online-shop:
    build:
      context: .
      dockerfile: Dockerfile
    image: dvharsh/online-shop:latest
    ports:
      - "3000:80"  # Map host port 3000 to container port 80
    volumes:
      - shop_backup:/usr/share/nginx/html  # Persistent backup of built files
    restart: always
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

volumes:
  shop_backup:
    driver: local


##Pushing to Docker Hub:

-- Built and pushed the final Docker image to Docker Hub:

docker login
docker push dvharsh/online-shop:latest


### 🚀 How to Run the Application Development (On EC2)

-Clone the Repository & Switch Branch:

git clone https://github.com/dvharsh/online_shop_hackathon.git
cd online_shop_hackathon
git checkout -b feature/final-phase1

-- Install Dependencies:

npm install

-- Start the Development Server:

npm run dev

-- Access the Application:

-Use the configured port in vite.config.js (e.g., accessible externally).

-- Production (Using Docker)
-Build the Docker Image with Compose:

docker-compose build --no-cache

-- Run the Container:

docker-compose up -d

-- Access the Application: Open your browser at:

-http://<EC2_PUBLIC_IP>:3000
-Replace <EC2_PUBLIC_IP> with your EC2 instance's public IP address.

### 📄 Submission Details
Final Submission Branch: final-phase1
Demo Video: https://vimeo.com/1058826176/d0fadfdc26?share=copy
Docker Hub Image: dvharsh/online-shop:latest


## Guidelines & Resources

Before diving into the tasks, please review the following key resources:

- [CONTRIBUTING.md](CONTRIBUTING.md): Guidelines for code contributions, commit messages, and overall coding standards.
- [ROADMAP.md](ROADMAP.md): Insights into the project vision, future enhancements, and milestones.
- **Repository Documentation:** Explore the repository to understand how the application is built. Pay special attention to the `src` directory where the main application logic resides, as well as configuration files such as `vite.config.js` and styling in `index.css`.

These documents provide the context needed to understand the project requirements and the best practices expected for your contributions.

---

## Tasks

For this hackathon phase, your work will center around the following tasks:

### Git & GitHub

- **Repository Management:** Fork and clone the repository, then create a new branch for your work. Ensure your commit history is clean and well-documented.
- **Collaboration Practices:** Follow best practices for version control by making descriptive commits, creating pull requests, and engaging in code reviews.
- **Workflow Optimization:** Identify any areas where the Git workflow can be improved and document your suggestions for future enhancements.

### Linux

- **Command Line Proficiency:** Review the code for examples of Linux command usage. Test and verify that file operations, system scripts, and environment configurations are functioning as expected.
- **System Administration:** Examine how the application handles Linux-based operations such as permissions, file management, and process monitoring. If you see room for improvement, implement those changes and document them.
- **Documentation:** Clearly document any Linux-related enhancements you make, explaining how they optimize the project’s performance or usability.

### Docker

- **Containerization Principles:** Even though a Dockerfile is not provided in this repository, consider how you would package and deploy this application using Docker. Reflect on the design decisions that would facilitate containerization.
- **Conceptual Improvements:** Propose any modifications or improvements that could make future Docker integration smoother. Document your suggestions clearly in your pull request.
- **Code Readiness:** Ensure the codebase is structured in a way that aligns with Docker best practices, preparing it for eventual containerized deployment on AWS EC2 / Azure VM / Google Compute Engine (Your Choice of Cloud).

---
> [!IMPORTANT]
> ## Submission Instructions
> 
> When you have completed your work, please follow these steps for submission:
>
> 1. **Review & Test Your Work:**
>    
>    - Make sure all changes are committed and pushed to your GitHub repository (or branch). Test the application thoroughly to confirm that your enhancements do not break existing functionality.
>    
> 2. **Prepare Your Submission:**
>    
>    -  Gather your full name, email address, and the URL to your GitHub repository (or the specific branch/commit that contains your work).
>    -  Make sure to add Demo video(which should be publically accessible) explaining your implementations for the project. This is the important aspect for evaluation. The Videos / Articles / Submissions should be submitted to the google form as well as shared on your LinkedIn/ twitter for extra points.
>    
> 3. **Submit via Google Form:**
>    
>    - Complete the submission form here:
>    
>    [Submit Your Work](https://docs.google.com/forms/d/e/1FAIpQLSdtOttzC9M__5ysJ_prVT1MtmV0qh1_PXrI5aYfd3zQNCF-CA/viewform?usp=header)
>    
> 4. **Timely Submission:**
>    
>    - Ensure that your submission is completed before the hackathon deadline. Late submissions will not be eligible for prizes.
>    

---

## Submission Details for Your Repo README

When submitting your repository link, your README must include:

- **Project Title & Overview:**
    
    Clearly state the project name (e.g., "Online Shop – Hackathon Phase 1 Submission") and provide a brief overview of your solution, emphasizing how it addresses Git & GitHub, Linux, and Docker.
    
- **Task Descriptions & Implementations:**
    
  -  Describe the tasks you worked on. Detail how you managed your repository, the Linux commands or scripts you used, and any improvements or suggestions regarding Docker integration.

> [!NOTE]
>
>  -  Provide video demo link (3-5 minutes only, not more than 5 minutes)

- **Key Changes & Enhancements:**
    
    Highlight the major changes or enhancements you made, including any refactoring, feature additions, or optimizations, along with documentation updates.
    
- **Final Submission Statement:**
    
    Include a clear declaration that this repository (or branch) represents your final submission for Hackathon Phase 1.
    
- **Version or Branch Information:**
    
    Specify which branch or commit should be reviewed (e.g., "Final submission branch: `final-phase1`").
    

Make sure this information is visible in your repository's README so that evaluators can easily review your work.

---

## Evaluation Criteria

Submissions will be evaluated based on the following criteria:

- **Adherence to Guidelines:**
    
    Your work should comply with the project’s coding standards, documentation, and contribution guidelines as described in this README and the [CONTRIBUTING.md](http://contributing.md/) file.
    
- **Git & GitHub Proficiency:**
    
    Evaluation of your version control practices, including branching strategy, commit quality, and pull request process.
    
- **Linux Competence:**
    
    Demonstrated ability to effectively use Linux for system administration tasks, scripting, and command-line operations within the project.
    
- **Docker Readiness:**
    
    Although a Dockerfile is not provided, your documentation and code structure should reflect an understanding of containerization best practices and readiness for future Docker integration.
    
- **Quality of Enhancements:**
    
    The significance and quality of your improvements, refactoring, and overall impact on the project’s functionality.
    
- **Documentation & Clarity:**
    
    Clear and concise documentation that explains your work, including details in your repository README about your tasks and changes.
    
- **Timeliness:**
    
    Your submission must be completed and submitted before the hackathon deadline.
    

---

## License

This project is licensed under the MIT License. See the [MIT](LICENSE) file for details.

---

## Contact

For any questions or further information, please contact:

- **Email:** [iemafzalhassan@gmail.com](mailto:iemafzalhassan@gmail.com) , [amitabhdevops2024@gmail.com](mailto:iemafzalhassan@gmail.com) , [deveshagent@gmail.com](mailto:deveshagent@gmail.com)
- [Join Discord Server](https://discord.gg/4JtuMhMcjn)

---

Good luck for the hackathon

Happy Learning :)
