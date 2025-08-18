import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img src={product.images?.[0] || "https://placehold.co/600x400"} alt={product.name} className="w-full h-40 object-cover" />
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-500 flex-1">{product.description}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-indigo-600 font-bold">₹{Number(product.price).toFixed(2)}</div>
          <button onClick={() => addToCart(product)} className="bg-indigo-600 text-white px-3 py-1 rounded-xl hover:bg-indigo-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
