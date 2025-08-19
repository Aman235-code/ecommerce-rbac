# 🛒 E-Commerce Platform with RBAC

A full-stack e-commerce application built with **React (Vite)** for the frontend, **Node.js/Express** with **Prisma + PostgreSQL** for the backend, and **JWT-based authentication with RBAC** (Role Based Access Control).  

This project demonstrates an end-to-end developer workflow: from authentication and cart/order management to CI/CD with GitHub Actions, Vercel, and Railway.

---

## 🚀 Tech Stack

### Frontend
- React (Vite) + React Router
- Tailwind CSS + Shadcn UI
- React Context for cart state management
- React Testing Library + Jest for unit testing

### Backend
- Node.js + Express
- Prisma ORM with PostgreSQL
- JWT Authentication + bcrypt password hashing
- Role Based Access Control (RBAC)
- Supertest + Jest for integration tests

### DevOps / CI/CD
- GitHub Actions → linting + tests
- Frontend → deployed to Vercel
- Backend → deployed to Railway
- Environment variables managed via `.env` and `.env.example`

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Aman235-code/ecommerce-rbac.git
cd ecommerce-rbac
```

###  2. Install dependencies
# Install frontend packages
cd apps/frontend
npm install

# Install backend packages
cd ../backend
npm install

### 3. Configure environment

Copy .env.example → .env in both frontend & backend

Add actual values for your local setup
Example (backend):
```
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=supersecret
```

### 4. Run locally
# Start backend
```
cd apps/backend
npm run dev
```

# Start frontend
cd apps/frontend
npm run dev



✨ Features Implemented

User authentication: signup & login with JWT

Secure password storage with bcrypt

Role Based Access Control (Admin / User)

Product listing and cart management

Order creation and history

Unit + Integration tests

CI/CD pipeline (GitHub Actions → Vercel + Railway)

.env.example for environment consistency

## 🙌 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to open a Pull Request or file an Issue.


## 📧 Contact
Created by [Aman](https://github.com/Aman235-code) – feel free to reach out!


