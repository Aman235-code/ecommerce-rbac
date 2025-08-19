import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
// Create a new order
router.post("/", verifyToken, async (req, res) => {
  const { items, total } = req.body;
 

  if (!items || items.length === 0)
    return res.status(400).json({ error: "Cart is empty" });

  try {
    // Create order
  
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        status: "PAID", // or PENDING depending on flow
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

   

    // Reduce product inventory
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { inventory: { decrement: item.quantity } },
      });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create order", details: err.message });
  }
});

// Get all orders for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
