import express from "express";
import pkg from "@prisma/client";
import { adminAuth } from "../middleware/adminAuth.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// GET all products
router.get("/",
  async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET single product by id
router.get("/:id",adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// POST /products - create a new product (admin only)
router.post("/add",adminAuth, async (req, res) => {
  try {
    const { name, description, price, category, inventory, image } = req.body;
    if (!name || !price)
      return res.status(400).json({ error: "Name and price required" });

    const product = await prisma.product.create({
      data: { name, description, price, category, inventory, image },
    });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create product", details: err.message });
  }
});

// PUT /products/update/:id - update product (admin)
router.put("/update/:id",adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, inventory, image } = req.body;

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, category, inventory, image },
    });

    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update product", details: err.message });
  }
});

// DELETE /products/delete/:id - delete product (admin)
router.delete("/delete/:id",adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete product", details: err.message });
  }
});

export default router;
