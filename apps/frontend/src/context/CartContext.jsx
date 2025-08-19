import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useProducts } from "./ProductsContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);

  const { fetchProducts } = useProducts();

  const fetchCart = async () => {
    if (!user) return setCart([]);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        fetchCart();
        fetchProducts();
        toast.success(`${product.name} added to cart`);
      } else {
        toast.error(data.error || "Failed to add item to cart");
      }
    } catch (err) {
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (cartItem) => {
    if (!user) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/cart/delete/${cartItem.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCart();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
   
    if (!user) return;
    try {
      await Promise.all(
        cart.map((item) =>
          fetch(`${import.meta.env.VITE_API_URL}/cart/clearcart/${item.Product.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
    
      setCart([]);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  const increaseQuantity = async (item) => {
    if (item.Product.inventory <= 0) {
      toast.error("Inventory limit reached");
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/cart/${item.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: item.quantity + 1, decrement: false }),
      });

      fetchCart();
      fetchProducts();
      toast.success("Quantity increased");
    } catch (err) {
      toast.error("Failed to increase quantity");
    }
  };

  const decreaseQuantity = async (item) => {
    const newQty = item.quantity - 1;

    try {
      if (newQty <= 0) {
        await fetch(`${import.meta.env.VITE_API_URL}/cart/${item.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Item removed from cart");
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/cart/${item.productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQty, decrement: true }),
        });
        toast.success("Quantity decreased");
      }
      fetchCart();
      fetchProducts();
    } catch (err) {
      toast.error("Failed to decrease quantity");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
