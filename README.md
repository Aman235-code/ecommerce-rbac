# 🛒 E-commerce RBAC Project

A full-stack e-commerce application with Role-Based Access Control (RBAC), built using React, Node.js, Express, and PostgreSQL (via Prisma ORM).

## 🚀 Tech Stack

* Frontend: React (Vite, Tailwind CSS, Shadcn UI)
* Backend: Node.js, Express.js
* Database: PostgreSQL with Prisma ORM
* Authentication: JWT (JSON Web Tokens)
* Deployment: Frontend → Vercel, Backend → Railway
* Other Tools: pgAdmin for DB management

## 🔗 Deployed Links

* Frontend: [https://ecommerce-rbac.vercel.app](https://ecommerce-rbac.vercel.app)
* Backend API: [https://ecommerce-rbac-production.up.railway.app](https://ecommerce-rbac-production.up.railway.app)

## ✨ Features Implemented

* User authentication (signup/login with JWT)
* Role-Based Access Control (admin, user)
* Product management (CRUD for admins)
* Shopping cart with add/update/remove functionality
* Order management (place and fetch orders)
* Integration with PostgreSQL using Prisma
* CI/CD setup for automated deployment
* Admin credentials seeded automatically

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Aman235-code/ecommerce-rbac.git
cd ecommerce-rbac
```

### 2, 3, 4. Install Dependencies, Setup Environment Variables, and Database

```bash
# Install frontend dependencies
cd apps/frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup environment variables

# Backend (.env)
# DATABASE_URL=postgresql://user:password@host:5432/dbname
# JWT_SECRET=your_jwt_secret
# PORT=4000
# CORS_ORIGIN="http://localhost:5173"

# Frontend (.env)
# VITE_API_URL=http://localhost:4000

# Setup Database
# Create PostgreSQL database and copy connection string to DATABASE_URL
npx prisma migrate dev
```

### 5. Seed Admin User

```bash
npx prisma db seed
```

Default admin credentials will be added automatically (email: [admin123@gmail.com], password: supaadmin123).

### 6. Run the App

**Backend**

```bash
cd apps/backend
npm run dev
```

**Frontend** (in a new terminal)

```bash
cd apps/frontend
npm run dev
```

Frontend → [http://localhost:5173](http://localhost:5173)
Backend → [http://localhost:4000](http://localhost:4000)

## 🧩 Notes

* Payment integration with Stripe or Razorpay can be added later.
* Admin dashboard and product search/filtering can be improved in future updates.

## 🙌 Contributing

Contributions, issues, and feature requests are welcome! Open a Pull Request or file an Issue.

## 📧 Contact

Created by Aman – reach out anytime!

## 📄 License

MIT License
