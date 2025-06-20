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

- ✅ **Frontend Authentication System**

  - Complete SignIn component with validation and error handling
  - Toast notifications for user feedback (react-hot-toast)
  - Responsive design with glitch video background
  - Form validation and loading states
  - Secure token storage and management
  - API integration with backend authentication endpoints

- ✅ **User Dashboard Implementation**

  - Complete user dashboard with sidebar navigation
  - Profile management (view user information)
  - Articles management interface
    - View user's articles with metadata
    - Create new articles with rich form
    - Real-time article statistics
  - Comments management (view user's comments)
  - Secure logout functionality
  - Responsive design matching SignIn component aesthetics
  - Multiple tab navigation system
  - Loading states and error handling

- ✅ **Frontend-Backend Integration**
  - Successfully connected React frontend to Node.js backend
  - API service layer implemented with native fetch
  - Authentication flow fully working
  - Protected dashboard access
  - Token-based authentication with persistence
  - CORS issues resolved
  - State management for user sessions
  - Automatic login persistence on page refresh

### Currently Working On:

- 🔄 **Enhanced Dashboard Features**
  - Profile editing functionality
  - Password change system
  - Article editing and deletion
  - Comment management with CRUD operations
  - Image upload for articles
  - Rich text editor integration

### Upcoming:

- 📅 **Public Blog Interface**
  - Public article viewing page
  - Article search and filtering
  - Category and tag system
  - Comment system for public users
- 📅 **Admin Dashboard** (for admin role users)
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
**Last Updated:** June 20, 2025

_The project now has a fully functional authentication system and user dashboard!_

## 📌 Project Overview

This project provides a complete blog platform where users can:

- **Authentication**: Register, login with persistent sessions
- **User Dashboard**: Comprehensive dashboard for content management
- **Content Management**: Create, read, update, delete blog articles
- **Community Features**: Comment on articles, manage own comments
- **Security**: Protected routes, resource ownership, JWT authentication
- **Modern UI**: Responsive design with video backgrounds and smooth animations
- **Real-time Feedback**: Toast notifications for all user actions

## 🛠 Technologies Used

**Frontend:**

- React.js 18+ (with Vite for fast development)
- React Hot Toast (notifications)
- SCSS (advanced styling with animations)
- Native Fetch API (no external HTTP libraries)
- Modern JavaScript (ES6+)

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
/Front-end                  --> React frontend (Vite)
  ├── public/
  │   └── glitch.mov        --> Background video asset
  ├── src/
  │   ├── component/
  │   │   └── Auth/
  │   │       ├── Login/
  │   │       │   ├── SignIn.jsx
  │   │       │   └── SignIn.scss
  │   │       └── User/
  │   │           ├── UserDashboard.jsx
  │   │           └── UserDashboard.scss
  │   ├── App.jsx           --> Main app component with routing
  │   ├── App.scss          --> Global styles
  │   ├── main.jsx          --> App entry point
  │   └── index.css         --> Base styles
  └── package.json          --> Frontend dependencies

/API                       --> Express backend
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

1. Navigate to frontend directory: `cd Front-end`
2. Install dependencies: `npm install`
3. Install required packages (if not already installed):
   ```bash
   npm install react-hot-toast
   ```
4. Add `glitch.mov` video file to the `public` folder
5. Start development server: `npm run dev` (runs on http://localhost:5174)

## 🔗 Current Integration Status

- ✅ **Backend API**: Fully functional and tested with Postman
- ✅ **Authentication Flow**: Complete login/logout system working
- ✅ **User Dashboard**: Fully implemented with all core features
- ✅ **Article Management**: Create and view articles working
- ✅ **Comment System**: View user comments implemented
- ✅ **State Management**: User sessions persist across page refreshes
- ✅ **Error Handling**: Comprehensive error handling with user feedback
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Security**: Protected routes and token management

## 🎯 Current Features Showcase

### Authentication System

- **Secure Login**: Email/password validation with error handling
- **Persistent Sessions**: Users stay logged in across browser refreshes
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Professional loading indicators during API calls

### User Dashboard

- **Profile Overview**: Display user information (name, email, role, join date)
- **Articles Management**:
  - View all user's articles with creation dates
  - Create new articles with title, content, and optional images
  - Real-time article count display
- **Comments Management**: View all user's comments with timestamps
- **Navigation**: Smooth tab-based navigation with active states
- **Logout**: Secure logout with cleanup

### Design Features

- **Video Background**: Immersive glitch video background
- **Modern UI**: Dark theme with glassmorphism effects
- **Responsive Layout**: Sidebar navigation that adapts to mobile
- **Smooth Animations**: Hover effects and transitions
- **Visual Feedback**: Color-coded buttons and status indicators

## 📝 Recent Achievements

- **June 20, 2025**: Completed full user dashboard implementation
- **June 20, 2025**: Fixed all React component and import issues
- **June 20, 2025**: Implemented article creation and management
- **June 20, 2025**: Added comprehensive user profile display
- **June 20, 2025**: Integrated toast notification system
- **June 18, 2025**: Successfully connected React frontend to Node.js backend
- **June 18, 2025**: Implemented working login form with validation
- **June 18, 2025**: Resolved all CORS configuration issues

## 🔐 Security Features

- **JWT Token Authentication**: Secure token-based authentication
- **Protected Routes**: Dashboard only accessible to authenticated users
- **Input Validation**: Frontend and backend validation
- **Password Hashing**: Secure password storage with bcrypt
- **CORS Protection**: Proper cross-origin request handling
- **Resource Ownership**: Users can only access/modify their own content

## 🎨 Design Philosophy

The application follows a modern, dark-themed design with:

- **Glassmorphism effects** for depth and elegance
- **Consistent color scheme** with purple gradients and dark backgrounds
- **Responsive layout** that works on all devices
- **Smooth animations** for enhanced user experience
- **Visual feedback** for all user interactions

## 🚀 Next Development Phase

The foundation is solid with a complete authentication system and functional user dashboard. The next focus will be on enhancing the dashboard features and building the public-facing blog interface for non-authenticated users to read articles and interact with content.

**The project demonstrates professional full-stack development practices and is ready for advanced feature development!** 🎉
