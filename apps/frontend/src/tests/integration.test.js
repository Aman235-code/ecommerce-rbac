// src/tests/integration.test.js
import request from "supertest";
import app from "../../../backend/app.js"; // <-- export app (not listen) in index.js for tests

describe("Integration Tests", () => {
  let token;
  let productId;

  it("should signup a user", async () => {
    const res = await request(app).post("/auth/signup").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should login the user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // refresh token
  });

  it("should fetch products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      productId = res.body[0].id;
    }
  });

  it("should create an order (authenticated)", async () => {
    if (!productId) {
      console.warn("⚠ No product found, skipping order creation test");
      return;
    }

    const order = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [{ productId, quantity: 1 }],
        total: 100,
      });

    expect([200, 201]).toContain(order.statusCode);
    expect(order.body).toHaveProperty("order");
    expect(order.body.order).toHaveProperty("id");
    expect(order.body.order.items.length).toBeGreaterThan(0);
  });

  it("should fetch orders for the user", async () => {
    const res = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
