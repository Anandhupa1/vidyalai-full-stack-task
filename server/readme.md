# PDF Manager with Local Disk Storage 💾

This version of the PDF Manager leverages local disk storage to provide a simple and effective way to manage PDF files. It is an excellent choice for small to medium-scale deployments where cloud storage is not required.

## 🛠 Setup and Configuration

Follow these instructions to set up the server using local disk storage. It's essential to follow each step to ensure proper server functionality.

### 📋 Prerequisites

Ensure you have the following before starting:
- Node.js and npm installed on your computer
- A MongoDB URI for your database connection

### 📥 Cloning the Repository

Begin by cloning the repository to get a local copy on your machine.

```bash
# Clone the repository

git clone https://github.com/Anandhupa1/vidyalai-full-stack-task.git

# Navigate to the local disk storage server directory

cd vidyalai-full-stack-task/server

# 🔑 Environment Variables

Before running the server, you need to configure the required environment variables:

1. Navigate to the root directory of your server.
2. Create a new `.env` file.
3. Fill in the `.env` file with your MongoDB and AWS S3 details:



     MONGOURI=your_mongo_uri
     PORT=your_preferred_port
     JWT_SECRET=your_jwt_secret


    Replace the `your_*` placeholders with your actual configuration values. Make sure this file is not tracked by Git and is kept secure.

# 📦 Installing Dependencies

With the `.env` file in place, install the project dependencies:

# Install npm dependencies
npm install
# run the server locally
npm run server
