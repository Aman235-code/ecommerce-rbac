import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // to get token

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!user) return setCart([]);
    try {
      const res = await fetch("http://localhost:4000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(data);
      setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return alert("Login required");
    try {
      await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    try {
      await fetch(`http://localhost:4000/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeFromCart = async (cartId) => {
    console.log("hkh", cartId);
    if (!user) return;
    try {
      await fetch(`http://localhost:4000/cart/${cartId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await Promise.all(
        cart.map((item) =>
          fetch(`http://localhost:4000/cart/${item.Product.productId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const increaseQuantity = async (item) => {
    console.log(item.Product.inventory, item.quantity);
    if (item.quantity >= item.Product.inventory) {
      alert("Cannot add more, inventory limit reached");
      return;
    }
    try {
      await fetch(`http://localhost:4000/cart/${item.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: item.quantity + 1, decrement: false }),
      });
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  const decreaseQuantity = async (item) => {
    const newQty = item.quantity - 1;
    console.log(item);
    try {
      if (newQty <= 0) {
        // remove item if quantity goes to 0
        await fetch(`http://localhost:4000/cart/${item.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await fetch(`http://localhost:4000/cart/${item.productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQty, decrement: true }),
        });
      }
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
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
