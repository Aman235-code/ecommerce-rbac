import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/auth.js"; // middleware to get user from JWT

const router = express.Router();
const prisma = new PrismaClient();

// Get current user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { Product: true },
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add item to cart
router.post("/", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cartItem = await prisma.cartItem.findFirst({
      where: { userId: req.user.id, productId },
    });
    if (cartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId: req.user.id, productId, quantity },
      });
    }
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Update quantity
// Update cart quantity and adjust product inventory
// PUT /cart/:productId
router.put("/:productId", verifyToken, async (req, res) => {
  const { quantity, decrement } = req.body; // new quantity & decrement flag
  console.log(quantity, decrement);
  const { productId } = req.params;
  console.log(productId);

  try {
    // Fetch cart item with product
    const cartItem = await prisma.cartItem.findFirst({
      where: { userId: req.user.id, productId: Number(productId) },
      include: { Product: true },
    });

    if (!cartItem)
      return res.status(404).json({ error: "Cart item not found" });

    let availableInventory;
    let diff;

    if (decrement) {
      // user is decreasing quantity
      diff = cartItem.quantity - quantity; // should be positive
      availableInventory = cartItem.Product.inventory + diff;

      if (quantity < 0)
        return res.status(400).json({ error: "Quantity cannot be negative" });
    } else {
      // user is increasing quantity
      diff = quantity - cartItem.quantity; // should be positive
      availableInventory = cartItem.Product.inventory + cartItem.quantity;

      if (quantity > availableInventory)
        return res
          .status(400)
          .json({ error: "Not enough inventory available" });
    }

    // Update cart item quantity
    await prisma.cartItem.update({
      where: { id: cartItem.id }, // using unique id
      data: { quantity },
    });

    // Update product inventory
    const newInventory = decrement
      ? cartItem.Product.inventory + 1
      : cartItem.Product.inventory - 1;

    await prisma.product.update({
      where: { id: Number(productId) },
      data: { inventory: newInventory },
    });

    res.json({ success: true, newQuantity: quantity, inventory: newInventory });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to update cart", details: err.message });
  }
});

// Remove item
router.delete("/:cartId", verifyToken, async (req, res) => {
  const { cartId } = req.params;
  console.log(cartId);
  try {
    const deleted = await prisma.cartItem.delete({
      where: {
        id: Number(cartId),
      },
    });
    res.json({ ok: true, deleted });
  } catch (err) {
    console.error("Failed to remove cart item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;
