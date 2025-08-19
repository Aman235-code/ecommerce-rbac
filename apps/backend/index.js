// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import pkg from "@prisma/client";
// import authRoutes from "./routes/auth.js";
// import productRoutes from "./routes/products.js";
// import cartRouter from "./routes/cart.js";
// import orderRouter from "./routes/orders.js";

// dotenv.config();
// const { PrismaClient } = pkg;
// const prisma = new PrismaClient();
// const app = express();

// app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
// app.use(express.json());

// app.get("/", (req, res) => res.json({ ok: true }));

// // auth routes
// app.use("/auth", authRoutes);
// app.use("/products", productRoutes);
// app.use("/cart", cartRouter);
// app.use("/orders", orderRouter);

// const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Backend listening on ${port}`));

// index.js
import app from "./app.js";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});
