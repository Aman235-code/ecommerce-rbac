# 🛒 E-commerce RBAC Project

A full-stack e-commerce application with **Role-Based Access Control (RBAC)**, built using React, Node.js, Express, and PostgreSQL (via Prisma ORM).

---

## 🚀 Tech Stack
- **Frontend:** React (Vite, Tailwind CSS, Shadcn UI)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:**  
  - Frontend → [Vercel](https://vercel.com)  
  - Backend → [Railway](https://railway.app)  
- **Other Tools:** GitHub Actions for CI/CD, pgAdmin for DB management

---

## ✨ Features Implemented
- User authentication (signup/login with JWT)
- Role-Based Access Control (admin, user)
- Product management (CRUD for admins)
- Shopping cart with add/update/remove functionality
- Order management (place and fetch orders)
- Integration with PostgreSQL using Prisma
- CI/CD setup for automated testing and deployment
- `.env.example` file for environment setup

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-rbac.git
cd ecommerce-rbac
```


### 2. Install Dependencies

# frontend
cd apps/frontend
npm install

# backend
cd ../backend
npm install


### 3. Setup Environment Variables
Create .env files in both frontend and backend.
You can start from .env.example included in the repo.

For backend (apps/backend/.env):

DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=5000

For frontend (apps/frontend/.env):
VITE_API_URL=http://localhost:5000


### 4. Setup Database
Create a PostgreSQL database (via pgAdmin, Railway, Supabase, etc.)

Copy the database connection string into DATABASE_URL in .env

Run Prisma migrations:
cd apps/backend
npx prisma migrate dev


### 5. Run the App

# backend
cd apps/backend
npm run dev

# frontend (in a new terminal)
cd apps/frontend
npm run dev

```
Frontend will run on http://localhost:5173 and backend on http://localhost:5000.

📦 Deployment
Frontend: Deployed to Vercel (apps/frontend)

Backend: Deployed to Railway (apps/backend)

GitHub Actions workflow runs linting and build before deployment.

🧩 Notes on Subscription Feature
A future extension could include a subscription model (e.g., premium users with extra features).

Payment integration with Stripe or Razorpay can be added later.

🚀 Roadmap
 Implement product search and filtering

 Improve admin dashboard
```

🙌 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open a Pull Request or file an Issue.

📧 Contact
Created by Aman – feel free to reach out!

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.