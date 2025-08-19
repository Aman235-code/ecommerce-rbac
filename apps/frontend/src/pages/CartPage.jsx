import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaBoxOpen, FaTag, FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const total = cart.reduce((s, i) => s + i.Product.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl mb-3">Your cart is empty</h2>
        <Link to="/" className="text-indigo-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
          
            {item.Product && (
              <img
                src={item.Product.image}
                alt={item.Product.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <div className="font-semibold text-lg">{item.Product.name}</div>
              {item.Product.category && (
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <FaTag /> {item.Product.category}
                </div>
              )}
              {item.description && (
                <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {item.Product.description}
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <FaBoxOpen /> Available: {item.Product.inventory || 0}
              </div>
            </div>

           
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <div>{item.quantity}</div>
              <button
                onClick={() => increaseQuantity(item)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="font-semibold">
                ₹{(item.Product.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="text-red-500 flex items-center gap-1"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

  
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</div>
        <div className="flex gap-3">
          <Link
            to="/checkout"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
