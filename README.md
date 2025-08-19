# 🛒 E-commerce RBAC Project

A full-stack e-commerce application with Role-Based Access Control (RBAC), built using React, Node.js, Express, and PostgreSQL (via Prisma ORM).

## 🚀 Tech Stack
- Frontend: React (Vite, Tailwind CSS, Shadcn UI)
- Backend: Node.js, Express.js
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT (JSON Web Tokens)
- Deployment: Frontend → Vercel, Backend → Railway
- Other Tools: GitHub Actions for CI/CD, pgAdmin for DB management

## ✨ Features Implemented
- User authentication (signup/login with JWT)
- Role-Based Access Control (admin, user)
- Product management (CRUD for admins)
- Shopping cart with add/update/remove functionality
- Order management (place and fetch orders)
- Integration with PostgreSQL using Prisma
- CI/CD setup for automated deployment
- Admin credentials seeded automatically

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Aman235-code/ecommerce-rbac.git
cd ecommerce-rbac
```

### 2. Install Dependencies
frontend
cd apps/frontend
npm install

backend
cd ../backend
npm install


### 3. Setup Environment Variables
Create .env files in frontend and backend using `.env.example` as a reference.

**Backend (`apps/backend/.env`):**
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=5000


**Frontend (`apps/frontend/.env`):**
VITE_API_URL=http://localhost:5000


### 4. Setup Database
- Create a PostgreSQL database.
- Copy connection string to `DATABASE_URL`.
- Run Prisma migrations:
```bash
cd apps/backend
npx prisma migrate dev
```

### 5. Seed Admin User
```bash
npx prisma db seed
```
Default admin credentials will be added automatically (email: admin123@gmail.com, password: supaadmin123).

### 6. Run the App
backend
cd apps/backend
npm run dev

frontend (in a new terminal)
cd apps/frontend
npm run dev

Frontend → http://localhost:5173  
Backend → http://localhost:5000

## 🧩 Notes
- Payment integration with Stripe or Razorpay can be added later.
- Admin dashboard and product search/filtering can be improved in future updates.

## 🙌 Contributing
Contributions, issues, and feature requests are welcome! Open a Pull Request or file an Issue.

## 📧 Contact
Created by Aman – reach out anytime!

## 📄 License
MIT License