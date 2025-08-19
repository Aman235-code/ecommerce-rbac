import request from "supertest";
import express from "express";
import authRouter from "../routes/auth.js";
import productRouter from "../routes/products.js";
import orderRouter from "../routes/orders.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

let token;      // for user
let adminToken; // for admin
let productId;
let orderId;

const testUser = { email: "testuser@example.com", password: "password123" };
const adminUser = { email: "admin@example.com", password: "admin123" };

describe("Integration Test: Auth, Products, Orders", () => {
  beforeAll(async () => {
    // Delete dependent records in correct order
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany({});

    // Create admin user directly
    const admin = await prisma.user.create({
      data: { ...adminUser, role: "ADMIN", password: await require("bcryptjs").hash(adminUser.password, 10) },
    });
    adminToken = (await request(app).post("/api/auth/login").send(adminUser)).body.token;
  });

  afterAll(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  // ---------------- AUTH ----------------
  it("Register a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send(testUser);
    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });

  it("Login existing user", async () => {
    const res = await request(app).post("/api/auth/login").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  // ---------------- PRODUCTS ----------------
  it("Create product (admin)", async () => {
    const res = await request(app)
      .post("/api/products/add")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Test Product", price: 100, category: "Test", inventory: 10 });
    expect(res.statusCode).toBe(200);
    productId = res.body.id;
  });

  it("Get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Update product (admin)", async () => {
    const res = await request(app)
      .put(`/api/products/update/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 150 });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(150);
  });

  it("Delete product (admin)", async () => {
    const res = await request(app)
      .delete(`/api/products/delete/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  // ---------------- ORDERS ----------------
  it("Create order (user)", async () => {
    // First create a product for order
    const prod = await prisma.product.create({
      data: { name: "Order Product", price: 50, inventory: 10, category: "Test" },
    });
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ items: [{ productId: prod.id, quantity: 2 }], total: 100 });
    expect(res.statusCode).toBe(200);
    orderId = res.body.order.id;
  });

  it("Get user orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Get single order", async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(orderId);
  });
});
