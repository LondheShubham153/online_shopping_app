Online Shop – Hackathon Phase 1 Submission

Overview

This project is an Online Shop application developed as part of the Hackathon Phase 1. The goal of this project was to implement Git & GitHub, Linux, and Docker to manage and deploy the application effectively.

Implemented Tasks

Git & GitHub

Used feature-hackathone branch for development.

Merged changes into the main branch.

Followed proper branching strategies and version control.

Linux

Used Linux commands for system setup and process management.

Configured necessary permissions and firewall rules.

Debugged network and port allocation issues using ss -tulnp.

Docker

Created a Dockerfile to containerize the application.

Built and ran the container using docker build and docker run.

Fixed issues related to port binding and missing dependencies.

Docker Usage

Build the Docker Image:

docker build -t online-shop .

Run the Container:

docker run -p 3000:3000 online-shop

Verify Running Container:

docker ps

Git Branch Info

Main Branch: Contains the final version of the project.

Feature-hackathone Branch: Used for development and testing before merging into main.

Video Demo

A demo of the project can be found at the following link:
Demo Video (Replace # with actual link)

Key Changes & Enhancements

Configured Docker to expose port 3000.

Fixed missing server.js issue.

Updated package.json to include the correct start script.

Resolved port already allocated errors in Docker.

Final Submission Statement

This repository contains the final submission for Hackathon Phase 1. All required implementations have been completed and tested.

Submission Instructions

The project has been pushed to GitHub.

The demo video is publicly accessible.

The submission form has been completed.

The project has been shared on LinkedIn/Twitter for extra points.
