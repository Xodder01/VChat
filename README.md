# VChat

VChat is a real-time chat application I built to learn and practice modern full-stack development. The project focuses on creating a fast, responsive messaging experience while implementing features that are commonly found in real-world chat applications.

---

## Features

* Secure user authentication using JWT
* Real-time messaging with Socket.io
* Online and offline user status
* Typing and notification sounds (can be turned on or off)
* Welcome emails sent after signup using Resend
* Image uploads with Cloudinary
* REST API built with Express.js
* MongoDB database for storing users and messages
* API rate limiting with Arcjet
* Responsive UI built with React, Vite, Tailwind CSS, and DaisyUI
* Global state management using Zustand

---

## Recent Improvements

After building the initial version, I continued improving both the frontend and backend.

Some of the major updates include:

* Redesigned the interface using the Galileo design system for a cleaner and more modern dark theme.
* Added unread message badges and improved real-time notifications.
* Implemented theme persistence so the selected theme is remembered across sessions.
* Refactored the codebase to make it cleaner and easier to maintain.
* Introduced Zustand for better state management.
* Added API rate limiting with Arcjet to improve security.
* Improved the email system using Resend.
* Configured ESLint and Prettier for consistent code formatting.
* Organized the project with a cleaner GitHub workflow using branches, pull requests, and release tags.

---

## Environment Variables

### Backend (`/backend`)

```env
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## Running the Project

### Start the Backend

```bash
cd backend
npm install
npm run dev
```

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Once both servers are running, open **http://localhost:5173** in your browser.

---

## Tech Stack

**Frontend**

* React
* Vite
* Tailwind CSS
* DaisyUI
* Zustand
* Socket.io Client

**Backend**

* Node.js
* Express.js
* MongoDB
* Socket.io
* JWT Authentication
* Cloudinary
* Resend
* Arcjet

