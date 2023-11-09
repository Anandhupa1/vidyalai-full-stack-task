# PDF Manager :page_facing_up:



PDF Manager is a robust web application designed to streamline the way users manage PDF files. It provides a secure platform for users to upload, edit, reorder pages, and seamlessly share their documents with a community. Empower your PDF handling experience with PDF Manager today!

## Features :sparkles:

- 🚀 **Efficient Authentication**: Sign up, log in, and Google OAuth for easy access.
- 📚 **PDF Management**: Upload and access your collection of PDFs.
- 📝 **Edit Your PDFs**: Select specific pages and edit the order to your preference.
- 💾 **Save & Versioning**: Keep different versions of your edited PDFs in the database.
- 📥 **Easy Downloads**: Download your PDFs effortlessly.
- 🌐 **Community Sharing**: Share your documents with the public community.

## Tech Stack :wrench:

Our application leverages a combination of modern technologies to deliver a top-notch user experience.

### Frontend

- **Next.js (React)** - The React framework for production.
- **Tailwind CSS with `daisyui`** - For beautiful, responsive UIs.
- **`react-pdf`, `pdfjs-dist`** - For rendering and manipulating PDFs in the browser.
- **`react-beautiful-dnd`, `react-dnd`, `react-dnd-html5-backend`** - For intuitive drag-and-drop interfaces.
- **`react-icons`** - To enhance the user interface with meaningful icons.
- **`sweetalert2` with `sweetalert2-react-content`** - For engaging alerts and modals.
- **`uuid`** - For generating unique identifiers.

### Backend

- **Express.js on Node.js** - For a minimalist and flexible server.
- **`bcrypt`**, **`jsonwebtoken`** - For secure authentication practices.
- **MongoDB with Mongoose** - For scalable database management.
- **AWS S3** - For reliable file storage solutions.
- **`pdf-lib`** - For comprehensive PDF manipulations.
- **`nodemon`** - For an improved development experience.

### Deployment & Operations

- **Amazon EC2** - For reliable server hosting.
- **PM2** - For process management and keeping services alive.
- **Load Balancing** - To ensure high availability and reliability.

## Getting Started :rocket:

To get a local copy up and running, follow these simple steps.

```bash
# Clone the repository
git clone https://github.com/Anandhupa1/vidyalai-full-stack-task.git

# Navigate to the frontend directory
cd "vidyalai-full-stack-task\client"

# Install dependencies
npm install

# Start the frontend application
npm run dev

# Navigate to the backend directory from the project root
cd "vidyalai-full-stack-task\server"

# Install dependencies
npm install

# Start the backend server
npm run server
