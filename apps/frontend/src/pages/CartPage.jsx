import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaBoxOpen, FaTag, FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = cart.reduce((s, i) => s + i.Product.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Your cart is empty</h2>
        <Link to="/" className="text-indigo-600 hover:underline text-lg">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Your Cart</h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-xl transition"
          >
            {item.Product && (
              <img
                src={item.Product.image}
                alt={item.Product.name}
                className="w-28 h-28 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <div className="font-semibold text-lg text-gray-800">{item.Product.name}</div>

              {item.Product.category && (
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <FaTag /> {item.Product.category}
                </div>
              )}

              {item.Product.description && (
                <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {item.Product.description}
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <FaBoxOpen /> Available: {item.Product.inventory || 0}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item)}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                -
              </button>
              <div className="px-2 font-medium">{item.quantity}</div>
              <button
                onClick={() => increaseQuantity(item)}
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end gap-2">
              <div className="font-semibold text-gray-800">
                ₹{(item.Product.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="text-red-500 flex items-center gap-1 hover:text-red-600 transition"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg shadow">
        <div className="text-xl font-bold text-gray-800">Total: ₹{total.toFixed(2)}</div>
        <Link
          to="/checkout"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
