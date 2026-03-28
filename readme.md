# 📝 Notes App (Fullstack - Auth & RBAC)

A full-stack Notes Management Application with **JWT Authentication**, **Role-Based Access Control (RBAC)**, and a modern React frontend.

---

## 🚀 Live Demo

* 🌐 Frontend: https://notes-app-auth-rbac.vercel.app
* ⚙️ Backend API: https://notes-app-auth-rbac-1.onrender.com

---

## 📌 Features

### 🔐 Authentication

* User registration & login
* Password hashing using **bcrypt**
* Secure authentication using **JWT**
* Cookie-based session handling

### 👥 Role-Based Access Control

* **User**

  * Create notes
  * View own notes
* **Admin**

  * View all users' notes
  * Delete any note

### 📝 Notes Management (CRUD)

* Create notes
* Fetch user-specific notes
* Admin can view all notes
* Admin can delete notes

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT (Authentication)
* bcrypt (Password hashing)
* Joi (Validation)
* CORS, Cookie-Parser, Rate Limiting

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios

---

## 📂 Project Structure

```
notes-app-auth-rbac/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   └── db/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   └── components/
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 🔐 Create `.env` file in backend

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### 🔑 Auth

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/v1/auth/register` | Register user/admin |
| POST   | `/api/v1/login`         | Login user          |
| POST   | `/api/v1/auth/logout`   | Logout              |

---

### 📝 Notes

| Method | Endpoint           | Access           |
| ------ | ------------------ | ---------------- |
| GET    | `/api/v1/note`     | User (own notes) |
| POST   | `/api/v1/note`     | User             |
| GET    | `/api/v1/note/all` | Admin            |
| DELETE | `/api/v1/note/:id` | Admin            |

---

## 🔐 Security Features

* Password hashing (bcrypt)
* HTTP-only cookies
* Secure cookies (`secure`, `sameSite`)
* Rate limiting (prevent brute force)
* Input validation using Joi
* CORS configured for frontend-backend communication

---

## 🚀 Deployment

* **Frontend** deployed on Vercel
* **Backend** deployed on Render
* **Database** hosted on MongoDB Atlas

---

## ⚠️ Important Notes

* MongoDB Atlas must allow:

```
0.0.0.0/0
```

* Backend must have correct CORS origin:

```
https://notes-app-auth-rbac.vercel.app
```

---

## 📸 Screenshots (Optional)

*Add screenshots of login, signup, dashboards here*

---

## 🧠 Scalability Notes

* Modular folder structure (controllers, routes, services)
* Middleware-based architecture
* Easily extendable to microservices
* Can integrate caching (Redis) in future
* Supports horizontal scaling with load balancers

---

## 👤 Author

**Pratyush Acharya**

---

## ⭐ Acknowledgement

This project was built as part of a full-stack development assignment focusing on **scalable API design, authentication, and frontend integration**.

---
