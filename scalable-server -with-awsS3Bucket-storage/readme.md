# PDF Manager with AWS S3 Storage 🌐📁

This version of the PDF Manager is configured to use Amazon Web Services (AWS) S3 Buckets for efficient and scalable storage of PDF files. It's designed to handle large-scale data storage while providing robust security features.

## 🛠 Setup and Configuration

To get this server up and running, follow the steps below carefully. Each step is critical to ensure that the server operates correctly.

### 📋 Prerequisites

Before you begin, make sure you have the following:
- An AWS account with S3 access
- Node.js and npm installed on your machine
- A MongoDB URI for your database connection

### 📥 Cloning the Repository

Start by cloning the repository to create a local copy on your machine.

```bash
# Clone the repository
git clone https://github.com/Anandhupa1/vidyalai-full-stack-task.git

# Navigate to the AWS S3 storage server directory
cd vidyalai-full-stack-task/scalable-server-with-awsS3Bucket-storage

# 🔑 Environment Variables

Before running the server, you need to configure the required environment variables:

1. Navigate to the root directory of your server.
2. Create a new `.env` file.
3. Fill in the `.env` file with your MongoDB and AWS S3 details:



    MONGOURI=your_mongo_uri
    PORT=your_preferred_port
    JWT_SECRET=your_jwt_secret
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    AWS_BUCKET_NAME=your_aws_bucket_name

    Replace the `your_*` placeholders with your actual configuration values. Make sure this file is not tracked by Git and is kept secure.

# 📦 Installing Dependencies

With the `.env` file in place, install the project dependencies:

# Install npm dependencies
npm install
# run the server locally
npm run server

