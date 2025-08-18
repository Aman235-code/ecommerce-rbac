import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const submit = () => {
    if (!user) {
      alert("Please login to place order");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      // simulate storing order in localStorage orders[]
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: Date.now(),
        userId: user.id,
        items: cart.map((i) => ({
          productId: i.id,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.price,
        })),
        total,
        status: "PAID",
        createdAt: new Date().toISOString(),
      };
      orders.unshift(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
      clearCart();
      setProcessing(false);
      nav("/orders");
    }, 800);
  };

  if (cart.length === 0) return <div className="p-6">Cart empty</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout (Simulated)</h2>
      <div className="mb-4">
        {cart.map((i) => (
          <div key={i.id} className="flex justify-between">
            <div>
              {i.name} × {i.quantity}
            </div>
            <div>₹{(i.price * i.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="mb-4 font-semibold">Total: ₹{total.toFixed(2)}</div>
      <button
        onClick={submit}
        disabled={processing}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {processing ? "Processing..." : "Place Order (Simulated)"}
      </button>
    </div>
  );
}
