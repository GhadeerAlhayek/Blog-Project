# DOM NEWS - Full-Stack Blog Platform

A modern blog platform where developers can share their coding journey and experiences.

## 🚀 What is DOM NEWS?

DOM NEWS is a complete blogging website built with:

- **Frontend**: React.js with modern responsive design
- **Backend**: Node.js API with MySQL database
- **Features**: User accounts, article writing, comments, mobile-friendly

## 📱 Key Features

✅ **User System**

- Sign up and log in
- Write and manage your articles
- Comment on other posts
- Personal dashboard

✅ **Mobile-First Design**

- Works perfectly on phones, tablets, and computers
- Modern glass-style interface
- Hamburger menu for mobile

✅ **Article Management**

- Create articles with images
- Edit and delete your posts
- View all published articles
- Comment system

## 🛠 How to Run This Project Locally

### What You Need First

- Node.js (version 18 or newer)
- MySQL database
- Code editor (like VS Code)

### Step 1: Get the Code

```bash
git clone [your-repo-url]
cd MY-FINAL-blog
```

### Step 2: Setup Database

1. Install MySQL on your computer
2. Create a new database called `blog_db`
3. Run the SQL file to create tables:

```sql
mysql -u root -p blog_db < API/sql/init.sql
```

### Step 3: Setup Backend

```bash
# Go to backend folder
cd API

# Install packages
npm install

# Create environment file
touch .env
```

**Add this to your `.env` file:**

```env
# Database Connection
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blog_db

# Security
JWT_SECRET=your_secret_key_here_make_it_long_and_random
JWT_EXPIRES_IN=24h

# Server
PORT=3000

# Email (Optional - for password reset)
RESEND_API_KEY=your_resend_key_if_you_want_emails
```

**Start the backend:**

```bash
npm start
```

Backend runs on: http://localhost:3000

### Step 4: Setup Frontend

```bash
# Go to frontend folder (open new terminal)
cd Frontend/blog

# Install packages
npm install

# Start the website
npm run dev
```

Frontend runs on: http://localhost:5173

### Step 5: Test Everything

1. Open http://localhost:5173 in your browser
2. Create an account
3. Write your first article
4. Test on mobile by making browser window small

## 📁 Project Structure

```
MY-FINAL-blog/
├── Frontend/blog/          # Website (React)
│   ├── src/
│   │   ├── component/      # All the website parts
│   │   ├── assets/css/     # Styling files
│   │   └── utils/          # Helper functions
│   └── package.json
│
├── API/                    # Server (Node.js)
│   ├── src/
│   │   ├── controller/     # Business logic
│   │   ├── model/          # Database operations
│   │   ├── router/         # API routes
│   │   └── config/         # Settings
│   ├── .env                # Your secret settings
│   └── package.json
│
└── README.md               # This file
```

## 🗄️ Database Tables

The project creates these tables automatically:

- **users**: People who sign up
- **articles**: Blog posts
- **comments**: Comments on articles
- **admins**: Admin permissions

## 🔐 Environment Variables Explained

Create a `.env` file in the `API` folder with these settings:

```env
# Your MySQL database info
DB_HOST=localhost              # Where your database is (usually localhost)
DB_USER=root                   # Your MySQL username
DB_PASSWORD=yourpassword       # Your MySQL password
DB_NAME=blog_db               # Name of the database

# Security for login tokens
JWT_SECRET=make_this_very_long_and_random_123456
JWT_EXPIRES_IN=24h            # How long users stay logged in

# Server settings
PORT=3000                     # Which port the server uses

# Email service (optional)
RESEND_API_KEY=your_key       # Only if you want password reset emails
```

## 📅 Project Timeline

**🎯 Project Duration: 2 months (May 2024 - July 2024)**

### Week 1-2: Planning & Setup

- ✅ Project planning and design
- ✅ Database design and setup
- ✅ Basic backend API structure
- ✅ React frontend initialization

### Week 3-4: Core Features

- ✅ User authentication (sign up, login)
- ✅ Article creation and management
- ✅ Basic UI components
- ✅ Database connections

### Week 5-6: Advanced Features

- ✅ Comment system
- ✅ User dashboard
- ✅ Image upload functionality
- ✅ API security and validation

### Week 7-8: Polish & Mobile

- ✅ Mobile-first responsive design
- ✅ Glass morphism UI styling
- ✅ Password management
- ✅ Final testing and bug fixes

**Final Result**: Complete, production-ready blog platform

## 🚀 What You Can Do After Setup

1. **Create Account**: Sign up as a new user
2. **Write Articles**: Share your coding experiences
3. **Upload Images**: Add pictures to your articles
4. **Comment**: Engage with other developers
5. **Manage Content**: Edit or delete your posts
6. **Mobile Use**: Access everything from your phone

## 🎨 Design Features

- **Glass Effect**: Modern transparent design
- **Mobile-First**: Perfect on all devices
- **Fast Loading**: Optimized for speed
- **User-Friendly**: Easy navigation and use

## 🔧 Troubleshooting

**Backend won't start?**

- Check if MySQL is running
- Verify .env file has correct database password
- Make sure port 3000 isn't being used

**Frontend won't start?**

- Run `npm install` again
- Check if port 5173 is available
- Try `npm run build` then `npm run preview`

**Can't create articles?**

- Make sure both frontend and backend are running
- Check browser console for errors
- Verify you're logged in

## 📞 Need Help?

If you have issues:

1. Check the browser console for error messages
2. Look at the terminal where servers are running
3. Make sure .env file is configured correctly
4. Verify MySQL database is running

---

**DOM NEWS** - Document your development journey! 🚀

_A complete blog platform built with modern web technologies for developers by developers._
