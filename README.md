# IAT MicroCourses Project

This project is a simple full-stack application built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to view, upload, and enroll in micro-courses.

## 🚀 Project Overview

The goal of this project is to demonstrate a basic full-stack web application using modern JavaScript technologies. It includes image upload, dynamic frontend rendering, and MongoDB integration.

## 🛠️ Tech Stack

### Frontend

- **React** (bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
- **TanStack Query** for data fetching and caching
- **Axios** for HTTP requests
- **React Router** for client-side routing
- **CSS Modules** / plain CSS for styling

### Backend

- **Node.js**
- **Express** for API routes and server logic
- **Multer** for image file uploads
- **Sharp** for image resizing and thumbnail generation

### Database

- **MongoDB** (via **MongoDB Atlas**)
- **Mongoose** for schema modeling

## 📂 Project Structure

```
project-root/
├── backend/
│ ├── server.js
│ ├── models/
│ └── public/images/
│ └── .env
├── frontend/
│ ├── public/
│ └── src/
│ └── .env
└── README.md
```

## ✨ Features

- Add and view micro-courses
- Upload and resize course images
- Store and retrieve data from MongoDB
- Enroll/unenroll functionality
- Organized image directories for large and thumbnail formats
- Fully responsive design
- Efficient data caching and synchronization with TanStack Query

## API & Caching with TanStack Query

This project uses TanStack Query (React Query) for powerful data fetching and caching.

- Fetching is done using Axios for clean and consistent HTTP requests
- Caching minimizes unnecessary API calls and provides instant updates on state changes
- Auto-refetching and background updates ensure data remains fresh across components
- Query invalidation is used to refresh course lists when new data is added (e.g., after enrolling or uploading a course)

## Routing

Routing between pages (e.g., Home, Course Details, Enroll, Upload) is handled using React Router, enabling smooth single-page navigation without full page reloads.

## 🔧 Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/MrWilliamA/iat-project.git
cd iat-project
cd backend
npm install

Create a .env file in the backend/ directory and add below:
    PORT=5000
    MONGO_URI= 'provided separately'

node server.js

Start the frontend:

cd ../frontend
npm install
npm start

Create a .env file in the backend/ directory and add below:
    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_BACKEND_URL=http://localhost:5000
```

## Image uploads

Uploaded course images are saved and processed like this:

- Large versions: backend/public/images/large/
- Thumbnails (330px wide): backend/public/images/thumb/
- Public images served at: /images route

## Notes

This is a basic demonstration app — authentication, pagination, and input validation are not implemented.

Designed for educational or portfolio purposes.
