import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { FaStar, FaBoxOpen, FaArrowLeft } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const p = products.find((x) => String(x.id) === String(id));
    setProduct(p || null);
  }, [id, products]);

  if (!product)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-500 text-lg">
        Product not found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      
      {/* Back Button */}
      <div className="col-span-full mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
        >
          <FaArrowLeft /> Back to Products
        </button>
      </div>

      {/* Product Images */}
      <div>
        <img
          src={`/${product.image}`}
          alt={product.name}
          className="w-full h-96 object-cover rounded shadow-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <span className="capitalize">{product.category}</span>
            <div className="flex items-center text-yellow-400">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(product.rating || 4) ? "opacity-100" : "opacity-30"}
                  />
                ))}
            </div>
          </div>
          <div className="text-2xl font-semibold text-indigo-600 mb-4">
            ₹{Number(product.price).toFixed(2)}
          </div>
          <div className="text-gray-700 mb-4">{product.description}</div>
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <FaBoxOpen /> Inventory: <span className="font-semibold">{product.inventory}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
