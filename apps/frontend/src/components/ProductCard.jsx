import React from "react";
import { FaStar, FaBoxOpen, FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, user }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold text-lg">
            ${product.price}
          </span>
          <div className="flex items-center text-yellow-400">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={i < 4 ? "opacity-100" : "opacity-30"}
                />
              ))}
          </div>
        </div>

        <div className="mt-2 flex items-center text-sm text-gray-500 gap-1">
          <FaBoxOpen /> Available: {product.inventory || 0}
        </div>

        {/* Add to Cart button (only if user is not ADMIN) */}
        {user && user.role !== "ADMIN" && (
          <button
            onClick={() => addToCart(product)}
            className="mt-3 w-full bg-indigo-500 text-white flex items-center justify-center gap-2 py-2 hover:bg-indigo-600 transition"
          >
            <FaCartPlus /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
