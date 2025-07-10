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

- ✅ **Frontend Authentication System (January 10, 2025)**
  - Background video component with loading optimization
  - Modern header with glass morphism design and responsive navigation
  - Footer with branding, call-to-action, and scroll-to-top functionality
  - Complete authentication flow with working Sign In/Sign Up modals
  - React Context API for global authentication state management
  - Axios API service layer with automatic error handling and response transformation
  - Real-time authentication state updates across all components
  - Persistent login sessions with localStorage integration
  - Professional error handling and user feedback systems
  - SCSS modular styling architecture
  - Seamless frontend-backend integration with JWT token management

### Currently Working On:

- 🔄 **Main Application Features**
  - User dashboard for authenticated users
  - Article creation and management interface
  - Article listing and detail views
  - Comment system interface
  - User profile management

### Upcoming:

- 📅 **Frontend Features to Implement**
  - Main blog content area and article listing
  - Article detail view with comments
  - User dashboard with profile management
  - Article management (create, edit, delete interface)
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
**Last Updated:** January 10, 2025

_Authentication system fully implemented and working! Users can now successfully sign up, sign in, and maintain their logged-in state across the application._

## 📌 Project Overview

This project provides a complete blog platform where users can:

- **Backend API**: Fully functional REST API with all CRUD operations
- **Authentication**: Complete user authentication with React Context state management
- **Content Management**: Create, read, update, delete blog articles (API ready)
- **Community Features**: Comment on articles, manage own comments (API ready)
- **Security**: Protected routes, resource ownership, JWT authentication
- **Frontend**: Modern React application with working authentication system

## 🛠 Technologies Used

**Frontend:**

- React.js 18+ with Vite build tool
- React Context API for state management
- Axios for HTTP requests with interceptors
- SCSS with modular component architecture
- Modern component design with hooks
- Glass morphism UI design
- Responsive mobile-first approach
- API integration layer with error handling

**Backend:**

- Node.js with Express.js
- MySQL database with proper relationships
- JWT authentication
- bcrypt password hashing
- Nodemailer email service
- CORS middleware

**Development Tools:**

- Vite (fast build tool)
- Sass (CSS preprocessing)
- Postman (API testing)
- MySQL Workbench
- VS Code with GitHub Copilot

## 📁 Project Structure

```
/Frontend                   --> React frontend (✅ Authentication Complete)
  └── blog/                --> React application with Vite
      ├── public/
      │   └── glitch.webm  --> Background video asset
      ├── src/
      │   ├── component/
      │   │   ├── Auth/         --> Sign In/Up modals (✅ Working)
      │   │   ├── Header/       --> Navigation header (✅ Complete)
      │   │   ├── Footer/       --> Footer with branding (✅ Complete)
      │   │   └── BackgroundVideo/ --> Video background (✅ Complete)
      │   ├── context/
      │   │   └── AuthContext.jsx --> Global auth state (✅ New)
      │   ├── assets/css/
      │   │   ├── style.scss    --> Main stylesheet
      │   │   └── partials/     --> SCSS modules
      │   ├── utils/
      │   │   └── api.js        --> Axios API service (✅ Enhanced)
      │   └── main.jsx         --> App entry point
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

## 🔌 API Endpoints (All Working & Integrated)

### Authentication ✅ (Frontend Connected)

- `POST /api/auth/register` - User registration (✅ Working with frontend)
- `POST /api/auth/login` - User login (✅ Working with frontend)
- `POST /api/auth/logout` - User logout (✅ Working with frontend)
- `GET /api/auth/verify-email/:token` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/password/forgot` - Request password reset
- `POST /api/auth/password/reset` - Reset password

### Articles ✅ (Ready for Frontend)

- `GET /api/articles` - Get all articles (public)
- `GET /api/articles/:id` - Get single article (public)
- `POST /api/articles/create` - Create article (Ready for frontend)
- `GET /api/articles/user/my-articles` - Get user's articles
- `PUT /api/articles/:id` - Update article (owner only)
- `DELETE /api/articles/:id` - Delete article (owner only)

### Comments ✅ (Ready for Frontend)

- `GET /api/comments/article/:articleId` - Get article comments (public)
- `POST /api/comments` - Create comment (authenticated)
- `GET /api/comments/my-comments` - Get user's comments
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
2. Install dependencies: `npm install`
3. Install Sass: `npm install -D sass`
4. Install Axios: `npm install axios` (for API communication)
5. Run development server: `npm run dev` (runs on http://localhost:5173)
6. Ensure backend API is running for authentication features

## 🔗 Current Integration Status

- ✅ **Backend API**: Fully functional and tested with Postman
- ✅ **Frontend Core**: Header, Footer, Background Video, and Auth Modals complete
- ✅ **Authentication System**: Complete working sign in/sign up with backend integration
- ✅ **API Service Layer**: Axios-based service with automatic response transformation
- ✅ **State Management**: React Context API for global authentication state
- ✅ **Modern UI Design**: Glass morphism effects and responsive design
- ✅ **Session Management**: Persistent login sessions with localStorage
- 🔄 **User Dashboard**: Next phase - authenticated user interface
- 🔄 **Article Management**: Will integrate with existing API endpoints
- ✅ **Database**: Fully functional with all required tables and relationships
- ✅ **Security**: Backend authentication and authorization complete

## 🎯 Authentication Features (Completed Today)

### Working Authentication Flow

- **Sign Up**: New user registration with backend validation

  - Full name, email, and password fields
  - Password confirmation validation
  - Real-time error feedback
  - Success message and automatic redirect to sign in

- **Sign In**: User login with JWT token management

  - Email and password authentication
  - Automatic token storage in localStorage
  - Immediate UI updates without page refresh
  - Welcome message display in header

- **Sign Out**: Complete session cleanup
  - API logout call to backend
  - localStorage cleanup
  - Automatic UI state updates
  - Return to unauthenticated state

### Technical Implementation

- **React Context API**: Global authentication state management

  - Centralized user state across all components
  - Automatic re-rendering when auth state changes
  - Error prevention with proper context validation

- **Axios API Service**: Professional HTTP client setup

  - Automatic JWT token injection in headers
  - Response transformation for backend data structure
  - Comprehensive error handling with user-friendly messages
  - Network error detection and reporting

- **State Persistence**: Reliable session management
  - localStorage integration with error handling
  - JSON parsing error prevention
  - Automatic auth state restoration on page refresh
  - Corrupted data cleanup and recovery

## 📝 Recent Achievements

- **January 10, 2025**: ✅ **Complete Authentication System Implementation**

  - Implemented React Context API for global authentication state management
  - Created comprehensive Axios API service layer with interceptors
  - Fixed frontend-backend API response structure mismatch
  - Implemented automatic response transformation for backend data format
  - Added real-time authentication state updates across all components
  - Resolved CORS preflight request issues and optimized API calls
  - Created seamless sign in/sign up flow with immediate UI updates
  - Implemented persistent login sessions with localStorage integration
  - Added comprehensive error handling for network issues and data corruption
  - Cleaned up debug code for production-ready authentication system
  - Achieved fully working authentication without page refresh requirements

- **January 8, 2025**: ✅ **Major Frontend Development Session**

  - Built complete Header component with responsive navigation
  - Created Footer with branding and interactive elements
  - Implemented Background Video component with loading optimization
  - Developed Authentication modal system (Sign In/Sign Up)
  - Created initial API service layer for backend communication
  - Fixed white flash issues with proper CSS loading
  - Implemented SCSS modular architecture
  - Added comprehensive error handling for localStorage and API calls

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

## 🎨 Current Frontend Architecture

The frontend follows modern React best practices:

- **Component Architecture**: Functional components with React hooks
- **State Management**: React Context API with localStorage persistence
- **HTTP Client**: Axios with interceptors for API communication
- **Styling**: SCSS modules with consistent design system
- **Responsive Design**: Mobile-first approach with breakpoints
- **Error Boundaries**: Comprehensive error handling throughout
- **API Integration**: Centralized service layer for backend communication

## 🚀 Next Development Phase

With authentication system complete, the next phase focuses on:

1. **Main Content Area**: Blog article listing and detail views
2. **User Dashboard**: Authenticated user interface for content management
3. **Article Management**: Create, edit, delete article interfaces
4. **Comment System**: User interface for article comments
5. **Advanced Features**: Search, filtering, and enhanced user experience

**Major milestone achieved: Complete working authentication system with frontend-backend integration!** 🎉

## 🔧 Development Commands

### Start Backend Server

```bash
cd API
npm run dev  # Runs on http://localhost:3000
```

### Start Frontend Development

```bash
cd Frontend/blog
npm run dev  # Runs on http://localhost:5173
```

### Build Frontend for Production

```bash
cd Frontend/blog
npm run build
```

### Test Authentication Flow

1. Start both backend and frontend servers
2. Navigate to http://localhost:5173
3. Click "Sign In" to open authentication modal
4. Register a new account or sign in with existing credentials
5. Observe immediate UI updates with welcome message
6. Test sign out functionality

**The project now has a fully functional authentication system ready for the next development phase!** ✨
