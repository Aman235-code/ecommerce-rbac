import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Get current user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { Product: true },
      orderBy: { createdAt: "asc" },
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
    // Fetch the product first to check inventory
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.inventory < quantity) {
      return res.status(400).json({ error: "Not enough inventory" });
    }

    // Check if the item already exists in cart
    let cartItem = await prisma.cartItem.findFirst({
      where: { userId: req.user.id, productId },
    });

    if (cartItem) {
      // Update cart quantity
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: { userId: req.user.id, productId, quantity },
      });
    }

    // Reduce product inventory
    await prisma.product.update({
      where: { id: productId },
      data: { inventory: product.inventory - quantity },
    });

    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Update cart quantity and adjust product inventory
router.put("/:productId", verifyToken, async (req, res) => {
  const { quantity, decrement } = req.body;

  const { productId } = req.params;

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
      availableInventory = cartItem.Product.inventory + diff;

      if (quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Not enough inventory available" });
      }
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

// Remove the last cart item having quantity as 1
router.delete("/:cartId", verifyToken, async (req, res) => {
  const { cartId } = req.params;

  try {
    // Find the cart item before deleting
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: Number(cartId) },
      include: { Product: true }, // get the product details too
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Delete the cart item
    const deleted = await prisma.cartItem.delete({
      where: { id: Number(cartId) },
    });

    // Increase product inventory back
    await prisma.product.update({
      where: { id: cartItem.productId },
      data: { inventory: { increment: cartItem.quantity } }, // restore based on cart qty
    });

    res.json({ ok: true, deleted });
  } catch (err) {
    console.error("Failed to remove cart item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// Delete the Cart - whole row and restoring the inventory
router.delete("/delete/:cartId", verifyToken, async (req, res) => {
  const { cartId } = req.params;

  try {
    // Find the cart item with product
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: Number(cartId) },
      include: { Product: true },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Delete the cart item
    const deleted = await prisma.cartItem.delete({
      where: { id: Number(cartId) },
    });

    // Restore product inventory
    await prisma.product.update({
      where: { id: cartItem.productId },
      data: {
        inventory: cartItem.Product.inventory + cartItem.quantity,
      },
    });

    res.json({ ok: true, deleted });
  } catch (err) {
    console.error("Failed to remove cart item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

router.delete("/clearcart/:productId", verifyToken, async (req, res) => {
  const { productId } = req.params;

  try {
    // Find all cart items for this product
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: req.user.id,
        productId: Number(productId),
      },
    });

    if (cartItems.length > 0) {
      // Calculate total quantity to restore
      const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

      // Delete all cart items of this product for this user
      const deleted = await prisma.cartItem.deleteMany({
        where: {
          userId: req.user.id,
          productId: Number(productId),
        },
      });

      // Restore inventory
      await prisma.product.update({
        where: { id: Number(productId) },
        data: {
          inventory: { increment: totalQty },
        },
      });

      return res.json({ ok: true, deleted, restored: totalQty });
    }

    res.json({ ok: true, deleted: 0 });
  } catch (err) {
    console.error("Failed to clear cart items:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
