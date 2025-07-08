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

- ✅ **Frontend Core Components (January 8, 2025)**
  - Background video component with loading optimization
  - Modern header with glass morphism design and responsive navigation
  - Footer with branding, call-to-action, and scroll-to-top functionality
  - Authentication modal system (Sign In / Sign Up)
  - API service layer for backend communication
  - SCSS modular styling architecture
  - Error handling and user feedback systems

### Currently Working On:

- 🔄 **Frontend Integration & Authentication**
  - Connecting authentication forms to backend API
  - Implementing user state management
  - Building authenticated user dashboard
  - Creating article creation and management interface
  - Developing responsive design patterns

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
**Last Updated:** January 8, 2025

_The backend API is fully functional and ready for frontend integration. Frontend core components completed with modern React architecture and design!_

## 📌 Project Overview

This project provides a complete blog platform where users can:

- **Backend API**: Fully functional REST API with all CRUD operations
- **Authentication**: Register, login with JWT token-based authentication  
- **Content Management**: Create, read, update, delete blog articles (API ready)
- **Community Features**: Comment on articles, manage own comments (API ready)
- **Security**: Protected routes, resource ownership, JWT authentication
- **Frontend**: Modern React application with core components implemented

## 🛠 Technologies Used

**Frontend:**

- React.js 18+ with Vite build tool
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
/Frontend                   --> React frontend (✅ Core Complete)
  └── blog/                --> React application with Vite
      ├── public/
      │   └── glitch.webm  --> Background video asset
      ├── src/
      │   ├── component/
      │   │   ├── Auth/         --> Sign In/Up modals
      │   │   ├── Header/       --> Navigation header
      │   │   ├── Footer/       --> Footer with branding
      │   │   └── BackgroundVideo/ --> Video background
      │   ├── assets/css/
      │   │   ├── style.scss    --> Main stylesheet
      │   │   └── partials/     --> SCSS modules
      │   ├── utils/
      │   │   └── api.js        --> API service layer
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

## 🔌 API Endpoints (All Working)

### Authentication ✅

- `POST /api/auth/register` - User registration (Connected to frontend)
- `POST /api/auth/login` - User login (Connected to frontend)
- `POST /api/auth/logout` - User logout (Connected to frontend)
- `GET /api/auth/verify-email/:token` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/password/forgot` - Request password reset
- `POST /api/auth/password/reset` - Reset password

### Articles ✅

- `GET /api/articles` - Get all articles (public)
- `GET /api/articles/:id` - Get single article (public)
- `POST /api/articles` - Create article (Ready for frontend)
- `GET /api/articles/user/my-articles` - Get user's articles
- `PUT /api/articles/:id` - Update article (owner only)
- `DELETE /api/articles/:id` - Delete article (owner only)

### Comments ✅

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
4. Run development server: `npm run dev` (runs on http://localhost:5173)
5. Ensure backend API is running for authentication features

## 🔗 Current Integration Status

- ✅ **Backend API**: Fully functional and tested with Postman
- ✅ **Frontend Core**: Header, Footer, Background Video, and Auth Modals complete
- ✅ **Authentication Forms**: Sign In/Sign Up modals with API integration
- ✅ **API Service Layer**: Complete service for all backend communication
- ✅ **Modern UI Design**: Glass morphism effects and responsive design
- 🔄 **User Dashboard**: Planning authenticated user interface
- 🔄 **Article Management**: Will integrate with existing API endpoints
- ✅ **Database**: Fully functional with all required tables and relationships
- ✅ **Security**: Backend authentication and authorization complete

## 🎯 Frontend Features (Completed Today)

### Core Components

- **Header Component**: Modern navigation with DOM NEWS branding
  - Fixed position with glass morphism effect
  - Responsive navigation (Home, Sign In, About)
  - User state management (Welcome message when logged in)
  - Sign out functionality
  - Mobile-responsive design

- **Footer Component**: Professional footer with branding
  - Fixed position matching header design
  - "Document Your Development Journey" tagline
  - Copyright notice for Ghadeer Alhayek
  - Sign Up call-to-action button
  - Smooth scroll-to-top arrow with SVG icon

- **Background Video**: Immersive video background
  - Glitch.webm video with autoplay and loop
  - Loading optimization to prevent white flash
  - Responsive design (hidden on mobile under 300px)
  - Fixed positioning behind all content

- **Authentication System**: Complete modal-based authentication
  - Sign In modal with email/password validation
  - Sign Up modal with password confirmation
  - Modal switching between Sign In/Sign Up
  - Error handling and user feedback
  - API integration with backend endpoints
  - Local storage management for user sessions

### Technical Implementation

- **SCSS Architecture**: Modular stylesheet organization
  - Separate partials for each component
  - Consistent design tokens and variables
  - Mobile-first responsive approach
  - Glass morphism design language

- **API Service Layer**: Complete backend communication
  - Centralized API service class
  - JWT token management
  - Error handling and validation
  - Support for all CRUD operations
  - Proper HTTP status code handling

- **Error Handling**: Robust error management
  - JSON parsing error prevention
  - LocalStorage corruption handling
  - Network error management
  - User-friendly error messages

## 📝 Recent Achievements

- **January 8, 2025**: ✅ **Major Frontend Development Session**
  - Built complete Header component with responsive navigation
  - Created Footer with branding and interactive elements
  - Implemented Background Video component with loading optimization
  - Developed Authentication modal system (Sign In/Sign Up)
  - Created API service layer for backend communication
  - Fixed white flash issues with proper CSS loading
  - Implemented SCSS modular architecture
  - Added comprehensive error handling for localStorage and API calls
  - Connected authentication forms to backend API endpoints
  - Resolved JSON parsing errors and localStorage corruption issues

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
- **State Management**: Local state with localStorage persistence
- **Styling**: SCSS modules with consistent design system
- **Responsive Design**: Mobile-first approach with breakpoints
- **Error Boundaries**: Comprehensive error handling throughout
- **API Integration**: Centralized service layer for backend communication

## 🚀 Next Development Phase

With core frontend components complete, the next phase focuses on:

1. **Main Content Area**: Blog article listing and detail views
2. **User Dashboard**: Authenticated user interface for content management
3. **Article Management**: Create, edit, delete article interfaces
4. **Comment System**: User interface for article comments
5. **Advanced Features**: Search, filtering, and enhanced user experience

**Major milestone achieved: Complete foundation with backend API + frontend core components!** 🎉

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

**The project now has a solid foundation with both backend API and frontend core components ready for continued development!** ✨