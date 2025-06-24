# 💬 PingChat — Real-Time Messaging Redefined

**PingChat** is a lightning-fast, full-stack real-time chat application built with the power of **Socket.io** and the modern MERN stack. Whether you're chatting with friends or building the next-gen messenger, PingChat brings you the tools and experience you need — secure, scalable, and stylish.

---

## ⚡ Features at a Glance

✅ 1:1 **Real-Time Messaging** with Socket.io  
🔐 **User Authentication** using JWT  
🧠 **Redux Toolkit** for seamless state management  
🗂️ **MongoDB + Mongoose** for user & chat persistence  
🖼️ **Cloudinary Image Uploads** for profile pictures and media  
✍️ **Live Typing Indicators**  
🟢 **Online/Offline Status**  
📱 **Fully Responsive Design** — Mobile + Desktop ready  
🎨 Built with sleek **Tailwind CSS** styling

---

## 🧰 Tech Stack

**Frontend:**
- React.js
- Redux Toolkit
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- JSON Web Tokens (JWT)
- Cloudinary API

---

## 🚀 Getting Started

### 🧾 Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- A Cloudinary account

---

### 🔧 Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/your-username/pingchat-app.git
cd pingchat-app
```
#### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file in /backend with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run dev
```
#### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

### 📁 Project Structure
```php

pingchat-app/
├── backend/                   # Node.js + Express backend
│   ├── config/                # DB and cloudinary config
│   ├── controllers/           # Route handler logic
│   ├── middlewares/           # Auth, error handling, etc.
│   ├── models/                # Mongoose schemas (User, Chat, Message)
│   ├── public/                # Static assets if any
│   ├── routes/                # API endpoints (user, chat, message)
│   ├── socket/                # Socket.io real-time logic
│   ├── .env                   # Environment variables
│   ├── index.js               # Entry point of the backend
│   └── package.json           # Backend dependencies
│
├── frontend/                  # React + Vite + Redux frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── assets/            # Icons, images, etc.
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React context providers
│   │   ├── customHooks/       # Custom reusable hooks
│   │   ├── pages/             # Main pages (Chat, Login, Signup, etc.)
│   │   ├── redux/             # Redux slices and store setup
│   │   ├── App.jsx            # Root component
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # React app entry point
│   ├── tailwind.config.js     # TailwindCSS config
│   ├── vite.config.js         # Vite bundler config
│   └── package.json           # Frontend dependencies
│
├── .gitignore
```
### 🔒 Security & Performance
- JWT-based route protection for authenticated endpoints

- Efficient socket connection management

- Cloudinary for secure and scalable image storage

### 📄 License
This project is licensed under the MIT License — feel free to use, modify, and share!


