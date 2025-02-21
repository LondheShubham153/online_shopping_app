### CHANGELOG.md

# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]
### Added
- **Git Operations:**
  - Forked the repository, cloned it locally, and created a feature branch.
  - Installed project dependencies and set up the development environment.
- **Vite & React Setup:**
  - Configured Vite (`vite.config.js`) with `host: '0.0.0.0'` and port `5173` for external access.
- **Linux Enhancements:**
  - Updated file permissions for improved security (`755` for directories and `644` for files).
  - Verified and tested Linux command functionality for file operations.
- **Process Management:**
  - Integrated **PM2** to run and monitor the application as a background process.
- **Docker Integration:**
  - Created a multi-stage Dockerfile using Node.js (for building) and Nginx (for serving static files).
  - Configured Docker Compose to build the image, map host port `3000` to container port `80`, attach a persistent volume (`shop_backup`), and apply healthchecks.
  
### Changed
- Modified Vite configuration to support external access.
- Improved commit history with structured and descriptive messages.
- Updated Linux file permissions to enforce security best practices.

### Fixed
- Resolved issues with background process management by switching from alternative methods to PM2.
- Addressed dependency and build issues by upgrading to Node 18 for the Docker build.

## [v1.0.0] - 2025-02-20
### Added
- Initial project setup including basic e-commerce functionality.
- Dockerfile and docker-compose configuration for containerized deployment.
- Basic documentation for Git, Linux, and Docker processes.
