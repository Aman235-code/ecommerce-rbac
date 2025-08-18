import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import { initialProducts } from "../data/dummyData";

export default function ProductsPage() {
  // either load from localStorage (admin edits) or fallback to initial
  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("products")) || initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // filters, pagination
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    // if no stored products, store initial ones
    const existing = localStorage.getItem("products");
    if (!existing)
      localStorage.setItem("products", JSON.stringify(initialProducts));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // compute filtered
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

  return (
    <div className="max-w-6xl mx-auto p-4 flex gap-6">
      <FilterBar
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        onApply={() => setPage(1)}
      />
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pageItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          total={total}
        />
      </main>
    </div>
  );
}
