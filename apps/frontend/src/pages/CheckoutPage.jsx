import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [processing, setProcessing] = useState(false);
  const token = localStorage.getItem("token");

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
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

      clearCart();
      nav("/orders");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center text-gray-500">
        Your cart is empty
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Checkout
      </h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.Product.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4 hover:shadow-xl transition"
          >
            {item.Product.image && (
              <img
                src={item.Product.image}
                alt={item.Product.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{item.Product.name}</div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <FaBoxOpen /> Available: {item.Product.inventory || 0}
              </div>
              <div className="text-gray-600 text-sm mt-1">
                Quantity: {item.quantity}
              </div>
            </div>
            <div className="font-semibold text-gray-800">
              ₹{(item.Product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg shadow">
        <div className="text-xl font-bold text-gray-800">Total: ₹{total.toFixed(2)}</div>
        <button
          onClick={submit}
          disabled={processing}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          {processing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
