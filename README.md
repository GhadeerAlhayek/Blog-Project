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

### Currently Working On:

- 🔄 **Frontend Development (Fresh Start)**
  - Starting frontend development from scratch after clearing previous implementation
  - Building new React.js application with modern architecture
  - Implementing authentication system from the ground up
  - Creating user dashboard and article management interface
  - Setting up responsive design and modern UI components

### Upcoming:

- 📅 **Frontend Features to Implement**
  - User authentication interface (login/register forms)
  - User dashboard with profile management
  - Article management (create, edit, delete, view)
  - Comment system interface
  - Admin dashboard for admin users
- 📅 **Public Blog Interface**
  - Public article viewing page
  - Article search and filtering
  - Category and tag system
  - Comment system for public users
- 📅 **Advanced Features**
  - Like/dislike system
  - Article pagination
  - User avatars and profiles
  - Email notifications
  - Social sharing
- 📅 **Performance Optimizations**
  - Image optimization
  - Lazy loading
  - Caching strategies

**Started:** May 26, 2025  
**Last Updated:** July 8, 2025

_The backend API is fully functional and ready for frontend integration. Frontend development has been restarted from scratch with a fresh approach!_

## 📌 Project Overview

This project provides a complete blog platform where users can:

- **Backend API**: Fully functional REST API with all CRUD operations
- **Authentication**: Register, login with JWT token-based authentication
- **Content Management**: Create, read, update, delete blog articles (API ready)
- **Community Features**: Comment on articles, manage own comments (API ready)
- **Security**: Protected routes, resource ownership, JWT authentication
- **Frontend**: Currently being rebuilt from scratch with modern React architecture

## 🛠 Technologies Used

**Frontend:**

- React.js 18+ (planned implementation with Vite)
- Modern component architecture (to be implemented)
- State management solution (to be determined)
- Responsive design framework (to be selected)
- API integration layer (to be built)

**Backend:**

- Node.js with Express.js
- MySQL database with proper relationships
- JWT authentication
- bcrypt password hashing
- Nodemailer email service
- CORS middleware

**Development Tools:**

- Vite (fast build tool)
- Postman (API testing)
- MySQL Workbench
- VS Code with GitHub Copilot

## 📁 Project Structure

```
/Frontend                   --> React frontend (to be rebuilt)
  └── blog/                --> New React application directory
      ├── public/
      ├── src/
      ├── package.json
      └── vite.config.js

/API                       --> Express backend (✅ Complete)
  ├── src/
  │   ├── config/          --> Database and email configuration
  │   ├── controller/      --> Route controllers
  │   ├── middelwares/     --> Authentication middleware
  │   ├── model/           --> Database models
  │   ├── router/          --> API routes
  │   └── utils/           --> Utility functions
  ├── .env                 --> Environment variables
  └── server.js           --> Main server file
```

## 🗄️ Database Schema

**Users Table:**

- id, name, email, password, role, created_at, updated_at

**Articles Table:**

- id, title, content, image_url, user_id, published, created_at, updated_at

**Comments Table:**

- id, content, article_id, user_id, created_at, updated_at

## 🔌 API Endpoints (All Working)

### Authentication ✅

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (Connected to frontend)
- `POST /api/auth/logout` - User logout (Connected to dashboard)
- `GET /api/auth/verify-email/:token` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/password/forgot` - Request password reset
- `POST /api/auth/password/reset` - Reset password

### Articles ✅

- `GET /api/articles` - Get all articles (public)
- `GET /api/articles/:id` - Get single article (public)
- `POST /api/articles` - Create article (Connected to dashboard)
- `GET /api/articles/user/my-articles` - Get user's articles (Connected to dashboard)
- `PUT /api/articles/:id` - Update article (owner only)
- `DELETE /api/articles/:id` - Delete article (owner only)

### Comments ✅

- `GET /api/comments/article/:articleId` - Get article comments (public)
- `POST /api/comments` - Create comment (authenticated)
- `GET /api/comments/my-comments` - Get user's comments (Connected to dashboard)
- `PUT /api/comments/:id` - Update comment (owner only)
- `DELETE /api/comments/:id` - Delete comment (owner only)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
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

1. Navigate to frontend directory: `cd Frontend/blog`
2. The frontend has been cleared and will be rebuilt from scratch
3. New React application setup will be documented once implementation begins
4. Modern development environment with Vite will be configured
5. Component architecture and styling approach will be determined during development

## 🔗 Current Integration Status

- ✅ **Backend API**: Fully functional and tested with Postman
- 🔄 **Frontend Development**: Starting fresh implementation from scratch
- 🔄 **Authentication Flow**: To be implemented in new frontend
- 🔄 **User Interface**: Planning new modern design approach
- 🔄 **API Integration**: Will be built into new frontend architecture
- ✅ **Database**: Fully functional with all required tables and relationships
- ✅ **Security**: Backend authentication and authorization complete

## 🎯 Backend Features (Complete & Ready)

### API Endpoints Available

All backend functionality is complete and ready for frontend integration:

### Authentication System

- **Secure Registration**: Complete user registration with email verification
- **Login/Logout**: JWT-based authentication system
- **Password Management**: Password reset functionality via email
- **Email Verification**: User account verification system

### Content Management

- **Article CRUD**: Full create, read, update, delete operations for articles
- **User Ownership**: Users can only modify their own articles
- **Public Access**: Articles can be viewed by all users
- **Author Information**: Articles include author details and timestamps

### Comment System

- **Comment CRUD**: Full comment management system
- **Article Association**: Comments linked to specific articles
- **User Ownership**: Users can only modify their own comments
- **Threaded Discussions**: Support for article-based comment threads

## 📝 Recent Achievements

- **July 8, 2025**: Reset frontend development for fresh start with modern architecture
- **July 8, 2025**: Cleared previous frontend implementation to rebuild from scratch
- **June 20, 2025**: Completed comprehensive backend API development
- **June 20, 2025**: Implemented all authentication endpoints and middleware
- **June 20, 2025**: Created complete article and comment management systems
- **June 18, 2025**: Established secure JWT authentication system
- **June 18, 2025**: Configured CORS and database connectivity
- **May 26, 2025**: Started project development with backend foundation

## 🔐 Security Features (Backend Complete)

- **JWT Token Authentication**: Secure token-based authentication system
- **Password Hashing**: Secure password storage with bcrypt
- **Input Validation**: Comprehensive backend validation for all endpoints
- **CORS Protection**: Proper cross-origin request handling configuration
- **Resource Ownership**: Users can only access/modify their own content
- **Role-based Access**: Admin and user role management system
- **Email Verification**: Secure user account verification process

## 🎨 Frontend Development Plan

The new frontend will be built with modern React architecture featuring:

- **Modern Component Architecture**: Function components with hooks
- **State Management**: Context API or Redux Toolkit (to be determined)
- **Responsive Design**: Mobile-first approach with modern CSS
- **Type Safety**: Consideration for TypeScript implementation
- **Testing**: Unit and integration testing setup
- **Performance**: Code splitting and lazy loading optimization

## 🚀 Next Development Phase

With a robust and complete backend API, the focus now shifts to building a modern, user-friendly frontend:

1. **Setup New React Application**: Initialize fresh Vite + React project
2. **Implement Authentication**: Login/register forms with API integration
3. **Build User Dashboard**: Profile management and content creation interface
4. **Create Public Blog**: Article viewing and comment system for all users
5. **Add Advanced Features**: Search, filtering, and enhanced user experience

**The backend foundation is solid and production-ready. Frontend development starts fresh with modern best practices!** 🎉
