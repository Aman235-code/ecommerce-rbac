import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const { user } = useAuth();
  const nav = useNavigate();
  const [processing, setProcessing] = useState(false);
  const token = localStorage.getItem("token");

  // Calculate total price
  const total = cart.reduce((s, i) => s + i.Product.price * i.quantity, 0);

  const submit = async () => {
    if (!user) {
      alert("Please login to place order");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setProcessing(true);

    try {
      // Send order to backend
     
      const res = await fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((i) => ({
            productId: i.Product.id,
            quantity: i.quantity,
          })),
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to place order");

      // Clear cart in frontend
      clearCart();

      // Navigate to orders page
      nav("/orders");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) return <div className="p-6">Cart empty</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        {cart.map((i) => (
          <div key={i.Product.id} className="flex justify-between">
            <div>
              {i.Product.name} × {i.quantity}
            </div>
            <div>₹{(i.Product.price * i.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="mb-4 font-semibold">Total: ₹{total.toFixed(2)}</div>
      <button
        onClick={submit}
        disabled={processing}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {processing ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
