# Online Shop 🛍️ for Hackathon Phase 1

[![Stars](https://img.shields.io/github/stars/iemafzalhassan/online_shop)](https://github.com/iemafzalhassan/online_shop)
![Forks](https://img.shields.io/github/forks/iemafzalhassan/online_shop)
![GitHub last commit](https://img.shields.io/github/last-commit/iemafzalhassan/easyshop?color=red)
[![GitHub Profile](https://img.shields.io/badge/GitHub-iemafzalhassan-blue?logo=github&style=flat)](https://github.com/iemafzalhassan)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

HELM
https://helm.sh/docs/intro/install/
https://artifacthub.io/packages/helm/jenkinsci/jenkins

*** helm vertion ***
*** helm repo list ***
*** helm repo update ***
*** helm repo add jenkins https://charts.jenkins.io ***
*** helm repo update ****
*** helm install jenkins-demo jenkins/jenkins --create-namespace ***

*** printf $(kubectl get secret jenkins-demo -o jsonpath="{.data.jenkins-admin-password"} | base64 --decode);echo  ***
<p align="center">

Welcome to the **Online Shop** project – our hackathon entry for Phase 1! This repository contains a fully functional e-commerce application built to demonstrate foundational DevOps skills in three key areas:

- **Git & GitHub**
- **Linux**
- **Docker**

In this phase, your focus is on understanding the provided developer code, reviewing how these core topics are implemented, and making any necessary enhancements. When you're ready, you'll submit your work via our designated Google Form.

---

### Project Details

### Content

- [**Situation**](#situation)
- [**Task**](#task)
- [**Action**](#action)
- [**Result**](#result--resume)

## Getting Started

- Video Demonstration

  [Video Demonstration](https://www.dropbox.com/scl/fi/06xq03rkx56hiak1080bo/videoDemo.mp4?rlkey=dje3ntpcd9zc3rzz1a1canhch&st=1vsn8k90&dl=0)

1. Home Page
![Home Page](public/homePage.png)
1. Admin Page
![Admin Page](public/adminPage.png)

## Guidelines & Resources

Before diving into the tasks, please review the following key resources:

- [CONTRIBUTING.md](CONTRIBUTING.md): Guidelines for code contributions, commit messages, and overall coding standards.
- [COMMANDS.md](): Command used by me throught the project from Configuration to Deployment. `Except Git Commands`
- [ROADMAP.md](ROADMAP.md): Insights into the project vision, future enhancements, and milestones.
- **Repository Documentation:** Explore the repository to understand how the application is built. Pay special attention to the `src` directory where the main application logic resides, as well as configuration files such as `vite.config.js` and styling in `index.css`.

These documents provide the context needed to understand the project requirements and the best practices expected for your contributions.

---

### Situation

As part of the **Train With Shubham Hackathon Phase 1**, I was given the charge of deploying an Online Shopping Portal to the internet. The main goal was to ensure that the website was easily accessible, reliable, and scalable so that it could handle user traffic efficiently. Achiving this using DevOps automation tools to develop the deployment process, reducing manual effort, and improving overall system performance. Involved setting up the necessary infrastructure, automating deployments, and ensuring the application could run smoothly in a real time.

---

### Task

- Develop the Required Infrastructre for Online Shopping Portal
- Clonning Necessary Code and Artifacts ensurig Secrutiy and Accessbility
- Strategize a `Deployment Plan` for brining the Applicaion to the Internet.

All this while ensuring:

- Gathering Necessary Resource for building the project.
- Implementing Automation Scripts.
- Using tools like `Docker` to build real world application.
- Grasp a good Hands-On on DevOps tools.
- Helping and Learning through Community!
- Strong Cloud and DevOps Infrastructure.

> Note: Remembering the Requirements

---

### Action

> I did this...

- Understood the [ROADMAP.md](ROADMAP.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for build up the project.
- Gathering the resources needed to fulfill the [`Task`](#task).
- Build a [`Docker Installation Script`](docker_installation.sh) automation script for installing and using Docker.
  > Running Script explained in [`COMMANDS.md File`]()!
- Setting up this Git Repository and Adding and Commiting Files
- Build a Dockerfile for the Online Shopping Portal Application
- Implemented Multi-Stage Docker Build which reduced the size of Image by `1GB` and increased deployment speed by `50%` improving efficiency and faster deployment
- Build a [`.dockerignore`](.dockerignore) file for ignoring the `Files and Directory` which are unecessary.
- Using .dockerignore help reduce the docker image size and improving its deployment speed.
- Built a `Docker Compose` file
- - Lead to faster implementation of Application
- - Performing Regular `Health Checks`.
- - Custom Network Configuration
- Implemented `Docker Scout` for Checking `Vulnerabilties` of Application. [`Docker Scout Report`](image_report.md)
- Used `Amazon EC2` to bring the Application to Internet

> Shown in Video Demonstration

---

### Result / Resume

- Successfully deployed the `Online Shopping Portal` on the internet using DevOps automation tools.
- Improved `deployment speed by 50% `and reduced `Docker image size by 1GB` using multi-stage builds.
- Ensured security and efficiency by implementing `Docker Scout` for `vulnerability analysis`.
- Automated the setup process with `Docker Installation Scripts` and `Docker Compose` for easy deployment.
- Deployed the application on `Amazon EC2`, making it accessible and scalable for real users.

---

Good luck for the hackathon

Happy Learning :)
