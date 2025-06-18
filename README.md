# Simple Blog Project

This is a **full-stack blog application** built using:

- **React.js** for the frontend
- **Node.js with Express** for the backend
- **MySQL** database with proper schema design

## 🚧 Project Status

This project is actively under development with the following components implemented:

### Completed:

- ✅ **Complete Backend API**

  - User authentication system (register, login, logout)
  - JWT-based authentication with both cookie and token support
  - Email verification system for new user registrations
  - Password management functionality (reset password via email)
  - Complete Article CRUD operations
    - Create articles (authenticated users)
    - Read all articles (public access)
    - Read single article by ID
    - Update articles (owner only)
    - Delete articles (owner only)
    - Get user's own articles
  - Complete Comment system
    - Create comments on articles
    - Read comments by article
    - Update/delete own comments
    - User ownership protection
  - Authorization middleware for role-based access
  - Resource ownership protection (users can only edit their own content)
  - Email service integration (Nodemailer with Gmail)
  - Comprehensive API endpoints with proper error handling
  - Database schema with users, articles, and comments tables
  - Security features (password hashing, JWT tokens, input validation)
  - CORS configuration for frontend-backend communication

- ✅ **Frontend-Backend Integration**
  - Successfully connected React frontend to Node.js backend
  - API service layer implemented with native fetch (no axios dependency)
  - Authentication flow working (login form connected to backend)
  - Toast notifications for user feedback
  - Token storage and management
  - Error handling and validation
  - CORS issues resolved

### Currently Working On:

- 🔄 **Frontend Development**
  - User dashboard implementation
  - Article management interface
  - Comment system UI
  - Navigation and routing setup
  - User role-based access control

### Upcoming:

- 📅 Complete frontend pages (dashboard, article creation, user profile)
- 📅 Image upload functionality for articles
- 📅 Search and filtering capabilities
- 📅 Category and tag system
- 📅 Admin dashboard
- 📅 Rich text editor for articles
- 📅 Article pagination
- 📅 Like/dislike system

**Started:** May 26, 2025  
**Last Updated:** June 18, 2025

_Note: This project will continue to evolve with new features and improvements._

## 📌 Project Overview

This project provides a complete blog platform where users can:

- **Authentication**: Register, login, verify email, reset password
- **Content Management**: Create, read, update, delete blog articles
- **Community Features**: Comment on articles, manage own comments
- **Security**: Protected routes, resource ownership, JWT authentication
- **Email Integration**: Account verification and password reset emails

It demonstrates a professional full-stack setup with RESTful API design, secure authentication, and proper database relationships.

## 🛠 Technologies Used

**Frontend:**

- React.js (with Vite)
- Native Fetch API (no axios)
- React Hot Toast (notifications)
- React Router (for navigation)

**Backend:**

- Node.js
- Express.js
- MySQL (database)
- JWT (authentication)
- bcrypt (password hashing)
- Nodemailer (email service)
- CORS (cross-origin requests)

**Development Tools:**

- Postman (API testing)
- MySQL Workbench (database management)
- VS Code with GitHub Copilot

## 📁 Project Structure

```
/client                     --> React frontend (Vite)
  ├── src/
  │   ├── components/      --> React components (SignIn, etc.)
  │   ├── services/        --> API service layer
  │   └── ...
/API                       --> Express backend
  ├── src/
  │   ├── config/          --> Database and email configuration
  │   ├── controller/      --> Route controllers (user, article, comment, password)
  │   ├── middelwares/     --> Authentication and authorization middleware
  │   ├── model/           --> Database models (User, Article, Comment)
  │   ├── router/          --> API routes
  │   └── utils/           --> Utility functions (email service)
  ├── .env                 --> Environment variables
  └── server.js           --> Main server file
```

## 🗄️ Database Schema

**Users Table:**

- id, name, email, password, email_verified, verification_token, role, created_at, updated_at

**Articles Table:**

- id, title, content, image_url, user_id, published, created_at, updated_at

**Comments Table:**

- id, content, article_id, user_id, created_at, updated_at

## 🔌 API Endpoints (All Working)

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login ✅ Connected to frontend
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-email/:token` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/password/forgot` - Request password reset
- `POST /api/auth/password/reset` - Reset password

### Articles

- `GET /api/articles` - Get all articles (public)
- `GET /api/articles/:id` - Get single article (public)
- `POST /api/articles` - Create article (authenticated)
- `GET /api/articles/user/my-articles` - Get user's articles (authenticated)
- `PUT /api/articles/:id` - Update article (owner only)
- `DELETE /api/articles/:id` - Delete article (owner only)

### Comments

- `GET /api/comments/article/:articleId` - Get article comments (public)
- `POST /api/comments` - Create comment (authenticated)
- `GET /api/comments/my-comments` - Get user's comments (authenticated)
- `PUT /api/comments/:id` - Update comment (owner only)
- `DELETE /api/comments/:id` - Delete comment (owner only)

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MySQL database setup
- Gmail account for email service (with app password)

### Backend Setup

1. Navigate to API directory: `cd API`
2. Install dependencies: `npm install`
3. Create `.env` file with required environment variables:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=blog_db
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Set up MySQL database and tables
5. Run server: `npm start` (runs on http://localhost:3000)

### Frontend Setup

1. Navigate to client directory: `cd client`
2. Install dependencies: `npm install`
3. Install required packages:
   ```bash
   npm install react-hot-toast react-router-dom
   ```
4. Start development server: `npm run dev` (runs on http://localhost:5174)

## 🔗 Current Integration Status

- ✅ **Backend API**: Fully functional and tested with Postman
- ✅ **Frontend-Backend Connection**: Successfully established
- ✅ **Authentication**: Login form connected and working
- ✅ **CORS Configuration**: Properly configured for cross-origin requests
- ✅ **Error Handling**: Comprehensive error handling on both ends
- ✅ **Token Management**: JWT tokens properly stored and managed

## 🎯 Current Focus

The backend is complete and robust. The main focus now is on building out the frontend user interface to create a full-featured blog application. The foundation is solid with secure authentication, complete CRUD operations, and proper API architecture.

## 📝 Recent Achievements

- **June 18, 2025**: Successfully connected React frontend to Node.js backend
- **June 18, 2025**: Implemented working login form with toast notifications
- **June 18, 2025**: Resolved all CORS configuration issues
- **June 18, 2025**: Established proper error handling and token management

The project demonstrates professional full-stack development practices and is ready for continued frontend development! 🚀
