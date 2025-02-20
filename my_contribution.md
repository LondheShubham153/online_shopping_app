Contribution Documentation

🚀 Work Done Till Now
1️⃣ Repository Fork & Branch Creation
Forked the original repository.

Created a new branch for Docker integration:

git checkout -b feature/docker-integration

2️⃣ EC2 Instance Setup & Project Clone
Connected to the EC2 instance using SSH:

ssh -i your-key.pem ec2-user@your-ec2-ip

Cloned the repository inside EC2:

git clone https://github.com/your-username/Online-Shop.git

Navigated to the project directory:

cd Online-Shop

3️⃣ Development Environment Setup
Installed Node.js & npm:

sudo apt update
sudo apt install -y nodejs npm

Installed project dependencies:

npm install

4️⃣ Running the Project on EC2
Started the development server:

npm run dev
Verified that the server was running locally.

5️⃣ Configuring External Access
Updated vite.config.js to allow external access:

server: {
  host: '0.0.0.0',
  port: 5173
}
Restarted the server:

npm run dev
Allowed port 5173 in EC2 Security Group settings.

6️⃣ Testing External Access
Accessed the app via:

http://your-ec2-ip:5173/

📌 Next Steps
Implement Dockerization for the project.

Set up Linux-based optimizations.

Automate deployment using CI/CD pipeline.
