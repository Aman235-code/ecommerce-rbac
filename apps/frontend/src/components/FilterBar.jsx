import React from "react";

export default function FilterBar({
  categories,
  filters,
  setFilters,
  onApply,
}) {
  return (
    <aside className="border rounded-2xl p-4 h-max">
      <div className="font-semibold mb-2">Filters</div>

      <input
        className="w-full border rounded-xl px-3 py-2 mb-2"
        placeholder="Search..."
        value={filters.q}
        onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
      />

      <select
        className="w-full border rounded-xl px-3 py-2 mb-2"
        value={filters.category}
        onChange={(e) =>
          setFilters((f) => ({ ...f, category: e.target.value }))
        }
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex gap-2 mb-2">
        <input
          className="w-1/2 border rounded-xl px-3 py-2"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, minPrice: e.target.value }))
          }
        />
        <input
          className="w-1/2 border rounded-xl px-3 py-2"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxPrice: e.target.value }))
          }
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onApply}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-xl"
        >
          Apply
        </button>
        <button
          onClick={() =>
            setFilters({ q: "", category: "", minPrice: "", maxPrice: "" })
          }
          className="flex-1 border rounded-xl"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
