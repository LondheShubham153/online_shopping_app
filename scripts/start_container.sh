  #!/bin/bash
  set -e

  # Pull the latest Docker image from Docker Hub
  docker pull rk0617/online-shop-app-demo:latest

  # Run the Docker image as a container
  docker run -d -p 5173:80 rk0617/online-shop-app-demo:latest
