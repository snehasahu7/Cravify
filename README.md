# Cravify: Food Ordering Platform

This document provides comprehensive information for developers working with the Cravify project, a food ordering platform consisting of a frontend, backend, and admin panel.

## 1. Project Description

Cravify is a full-stack web application built with React, Vite, Express.js, and MongoDB. It allows users to browse a menu, add items to their cart, place orders, and manage their order history.  The admin panel provides tools for managing food items.


## 2. Key Features

**Frontend:**

* User-friendly interface for browsing food items.
* Add items to cart functionality.
* Secure user authentication (login/signup).
* Order placement with delivery address input.
* Order history tracking.
* Responsive design for various devices.

**Backend:**

* RESTful API for managing food items, users, and orders.
* Secure user authentication using JWT.
* Payment integration (Razorpay).
* Database management using MongoDB.
* Image upload and storage.

**Admin Panel:**

* Adding new food items with image upload.
* Viewing and managing existing food items.
* Removing food items.
* (Orders page - currently not implemented)


## 3. Technologies Used

**Frontend:**

* React 19.0.0
* Vite 6.1.0
* React Router DOM 7.1.5
* Axios 1.7.9
* CSS

**Backend:**

* Node.js
* Express.js 4.21.2
* Mongoose 8.10.1
* MongoDB
* Multer 1.4.5-lts.1
* bcrypt 5.1.1
* jsonwebtoken 9.0.2
* validator 13.12.0
* Razorpay 2.9.6
* dotenv 16.4.7
* cors 2.8.5
* body-parser 1.20.3

## 4. Prerequisites

* Node.js and npm (or yarn) installed on your system.
* MongoDB instance running (for both frontend and backend).  The connection string is currently hardcoded in `Backend\config\db.js`.  You'll need to update this with your own MongoDB connection string.
* A Razorpay account (for payment integration in the backend).  API keys should be set as environment variables (see Configuration section).


## 5. Installation Guide

**Backend:**

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the `Backend` directory: `cd Backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the `Backend` directory and add your environment variables:

```
RAZORPAY_SECRET_ID=<your_razorpay_secret_id>
RAZORPAY_SECRET_KEY=<your_razorpay_secret_key>
JWT_SECRET=<your_jwt_secret>
```

5. Run the server: `npm run server`

**Frontend:**

1. Navigate to the `Frontend` directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`


**Admin Panel:**

1. Navigate to the `Admin` directory: `cd Admin`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## 6. Usage Examples

**Frontend:**

* Access the application through your browser at `http://localhost:5173` (after running `npm run dev` in the `Frontend` directory).  You can navigate between Home, Cart, and Order pages using the links provided.

**Backend:**  The backend is an API, interacted with by the frontend and admin panel.  Endpoints are documented in the respective route files (`Backend/routes/*.js`).


**Admin Panel:**

* Access the admin panel through your browser at `http://localhost:5174` (after running `npm run dev` in the `Admin` directory).  You can add, list, and remove food items.


## 7. Configuration

**Backend:**  The backend uses environment variables for sensitive information like Razorpay keys and JWT secret.  Create a `.env` file in the `Backend` directory (as detailed in the Installation Guide) and add your keys.

**Frontend:** There are no configuration files in the frontend directly.

**Admin Panel:** There are no configuration files in the admin panel directly.


## 8. Project Structure

The project is divided into three main folders: `Frontend`, `Backend`, and `Admin`.

* **Frontend:** Contains the React code for the user-facing interface.
* **Backend:** Contains the Node.js and Express.js code for the API.
* **Admin:** Contains the React code for the admin panel.



## 9. Contributing Guidelines

(Not explicitly found in the provided codebase.  Guidelines should be added to the respective repositories for each part of the application.)


## 10. License Information

(Not explicitly found in the provided codebase.  A LICENSE file should be added to each directory specifying the license under which the code is distributed.)


## Potential Error Messages and Troubleshooting

**Backend:**

* **Database connection errors:** Check your MongoDB connection string in `Backend\config\db.js` and ensure your MongoDB instance is running.
* **Environment variable errors:** Verify that your `.env` file is correctly configured and that the required environment variables are set.

**Frontend:**

* **API request errors:** Check your network connection and ensure that the backend server is running. Inspect the browser's developer console for detailed error messages.

**Admin Panel:**

* **Similar to Frontend:** Check network connectivity, and backend server status.  Also ensure the correct API endpoints are being called.


This README provides a starting point.  More detailed documentation can be added within the codebase itself using JSDoc style comments for the Javascript code, and detailed comments within the other files.  Consider adding a `docs` folder for more extensive documentation, if needed.
