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

### Code Overview

**server.js:** sets up the Express.js backend for the project. It connects to MongoDB using Mongoose, defines a Course model, and provides API routes to fetch, create, and update course data. It also handles image uploads with Multer and generates thumbnails using Sharp. Static files and images are served as needed, and the server listens on a configurable port.

**index.js:** initializes the React application. It renders the root App component inside a BrowserRouter to enable client-side routing and wraps it with React.StrictMode for highlighting potential issues during development.

**App.jsx:** the main entry point for the React frontend. It sets up client-side routing with React Router and wraps the app in a TanStack Query client for data fetching and caching. It renders shared layout components like Header and Footer, and defines routes for the main page, course details, about, and contact pages.

**index.css:** contains global styles for the React application. It defines base styles, resets default browser styles, and applies consistent typography, spacing, and layout rules across all components.

**Main.jsx:** displays a list of available courses. It fetches course data using TanStack Query and Axios, handles loading and error states, and optionally renders an AddCourseForm for creating new courses. Each course is shown using a CourseCard component.

**CourseCard.jsx / CourseCard.css:** displays a summary of a course, including its image, title, duration, price, and a link to the full course details. It uses React Router's Link to enable navigation to the course detail page. The CSS file is for styling.

**AddCourseForm.jsx / AddCourseForm.css:** renders a form to add new courses, managing form state locally with useState. It uses TanStack Query's useMutation to submit form data, including course details, modules, and an image file, to the backend. It handles success by invalidating the course list query to refresh data, and errors by alerting the user. The form supports adding multiple modules dynamically and includes cancel functionality to reset and close the form. The CSS file is for styling.

**CourseDetails.jsx / CourseDetails.css:** fetches and displays detailed information for a specific course identified by the URL param courseId. It uses TanStack Query’s useQuery to fetch the course data, including title, description, category, instructor, modules, and price. It also provides an Enroll/Unenroll button powered by a useMutation hook that sends a PATCH request to toggle enrollment status. On success, it invalidates the query cache for that course to update the UI. The component handles loading and error states, and includes a back link to return to the courses list.

**About.jsx / Contact.jsx:** demonstrate the use of react router, and how its used to make other 'pages'.

**Footer.jsx/ Footer.css / Header.jsx / Header.css:** provide basic structure, branding and basic navigation. The css files provide styling to each component.

**NavMenu.jsx:** defines a simple navigation menu using NavLink from React Router. It provides links to the Home, About, and Contact pages for easy navigation across the app.

**Error.jsx:** displays a user-friendly error message when something goes wrong. It receives an error object as a prop and shows its message inside the UI.

**Loading.jsx:** shows a loading animation and message while course data is being fetched, providing a better user experience during asynchronous operations.

### Data Structure

This is an example of the course data structure in MongoDb Atlas

```
{
    "title": "Debugging Zen",
    "summary": "Master the art of debugging across languages and platforms.",
    "description": "This course dives into the meditative practice of debugging, offering insights into common code pitfalls, logical errors, and elusive bugs that sneak past compilers. You’ll learn strategies to systematically isolate problems using tools like breakpoints, logging, and performance profiling.\n\nThrough hands-on exercises, participants build a mindset of curiosity and patience, tackling code issues from different angles. Whether it's a JavaScript quirk or a Python exception, this course will sharpen your eye for code patterns and empower you to debug with grace.",
    "duration": 12,
    "price": 349,
    "img": "1.png",
    "modules": [
      { "name": "Understanding Code Pitfalls", "marks": 5 },
      { "name": "Logical Error Isolation", "marks": 5 },
      { "name": "Debugging Tools & Techniques", "marks": 5 },
      { "name": "Cross-Language Debugging", "marks": 5 },
      { "name": "Mindful Problem Solving", "marks": 5 }
    ],
    "enrolled": false,
    "instructor": "Jordan Lee",
    "category": "Software Engineering"
  },
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
