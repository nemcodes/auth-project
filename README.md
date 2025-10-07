---

## 🚀 Auth Project

A modern authentication system built with **Node.js**, **Express**, **MongoDB**, and **React** — designed to demonstrate secure user management, email verification, password reset functionality, and session handling in a full-stack environment.

---

### ✨ Features

* 🔐 **User Authentication** (Signup, Login, Logout)
* ✅ **Email Verification** before granting access
* 🔑 **Forgot & Reset Password** system
* 🍪 **JWT-based Authentication** with HTTP-only cookies
* 💌 **Email Integration** via Mailtrap
* 🧭 **Protected Routes** and role-based redirects
* 🎨 Minimal frontend with **React + TailwindCSS**

---

### 🧠 Tech Stack

**Frontend:** React, TailwindCSS, React Router, Zustand (for state management)
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Mailtrap
**Build Tools:** Vite

---

### 💡 Why This Project Matters

This project demonstrates a **solid understanding of backend development** — from building RESTful APIs and managing authentication flows to handling secure cookies and connecting to MongoDB.

It also shows your ability to **connect backend logic to a real frontend**, handle protected routes, and ensure a smooth user experience.

Overall, it highlights your **backend problem-solving skills** while showing that you can **ship production-ready full-stack applications** — a valuable trait for any junior developer role.

---

### ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/nemcodes/auth-project.git
cd authproject

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run frontend (localhost:5173)
npm run dev

# Run backend (localhost:5000)
cd ../backend
npm start
```

---

### 🚀 Deployment Instructions

#### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add your MongoDB URI, JWT secret, and other environment variables

The deployment will:
1. Install dependencies for both backend and frontend
2. Build the React frontend
3. Start the Express server which will serve both the API and the frontend

---

Would you like me to add a short **“Future Improvements”** section (like adding social login, admin dashboard, etc.) to make it feel more complete for recruiters?

