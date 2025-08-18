import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const p = products.find((x) => String(x.id) === String(id));
    setProduct(p || null);
  }, [id]);

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {product.images?.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={product.name + i}
              className="h-20 object-cover rounded"
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-gray-500 mb-3">{product.category}</div>
        <div className="text-lg font-semibold mb-3">
          ₹{Number(product.price).toFixed(2)}
        </div>
        <div className="mb-4 text-gray-700">{product.description}</div>
        <div className="mb-4">
          Inventory: <span className="font-semibold">{product.inventory}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
