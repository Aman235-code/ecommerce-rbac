import React, { useEffect, useMemo, useState } from "react";

import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // useEffect(() => {
  //   const existing = localStorage.getItem("products");
  //   if (!existing)
  //     localStorage.setItem("products", JSON.stringify(initialProducts));
  // }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.slice();
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (filters.category)
      list = list.filter((p) => p.category === filters.category);
    if (filters.minPrice)
      list = list.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice)
      list = list.filter((p) => p.price <= Number(filters.maxPrice));
    return list;
  }, [products, filters]);

  const total = filtered.length;
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [filters]);

  const resetFilters = () => {
    setFilters({ q: "", category: "", minPrice: "", maxPrice: "" });
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Catalog</h1>

      {/* Filter Bar */}
      <div className="bg-white shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="w-24 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="w-24 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={resetFilters}
          className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pageItems.map((product) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        total={total}
      />
    </div>
  );
}
