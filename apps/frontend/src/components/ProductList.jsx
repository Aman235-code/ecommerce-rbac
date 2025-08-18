import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Headphones",
    description: "High-quality sound",
    price: 79.99,
    category: "Electronics",
    image: "/images/headphones.jpg", // from public/images
  },
  {
    id: 2,
    name: "Keyboard",
    description: "Mechanical RGB keyboard",
    price: 99.99,
    category: "Electronics",
    image: "/images/keyboard.jpg", // from public/images
  },
  {
    id: 3,
    name: "Shoes",
    description: "Comfortable running shoes",
    price: 59.99,
    category: "Sports",
    image: "/images/shoes.jpg", // from public/images
  },
];

function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
