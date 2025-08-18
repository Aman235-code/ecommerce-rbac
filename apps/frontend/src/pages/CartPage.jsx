import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

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
            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">
                ₹{item.price.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <div>{item.quantity}</div>
              <button
                onClick={() => addToCart(item)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</div>
        <div className="flex gap-3">
          <button onClick={clearCart} className="bg-gray-200 px-4 py-2 rounded">
            Clear
          </button>
          <Link
            to="/checkout"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
