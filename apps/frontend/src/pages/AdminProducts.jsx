import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/*
Simple Admin UI (frontend-only): creates/edits/deletes products in localStorage.
Requires user.role === "ADMIN"
*/

export default function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0,
    images: [],
  });

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
  }, []);

  function saveProducts(list) {
    localStorage.setItem("products", JSON.stringify(list));
    setProducts(list);
  }

  function startAdd() {
    setEditing("new");
    setForm({
      name: "",
      description: "",
      price: 0,
      category: "",
      inventory: 0,
      images: [],
    });
  }
  function startEdit(p) {
    setEditing(p.id);
    setForm({ ...p, images: p.images || [] });
  }
  function removeProduct(id) {
    const list = products.filter((p) => p.id !== id);
    saveProducts(list);
  }

  function upsert() {
    if (!form.name) return alert("name required");
    if (editing === "new") {
      const newP = { ...form, id: Date.now() };
      saveProducts([newP, ...products]);
    } else {
      const list = products.map((p) =>
        p.id === editing ? { ...form, id: editing } : p
      );
      saveProducts(list);
    }
    setEditing(null);
  }

  if (!user || user.role !== "ADMIN")
    return <div className="p-6">Forbidden — admin only</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin — Products</h2>

      <div className="mb-4">
        <button
          onClick={startAdd}
          className="bg-indigo-600 text-white px-3 py-2 rounded"
        >
          Add New Product
        </button>
      </div>

      {editing && (
        <div className="bg-white p-4 rounded mb-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full mb-2 border px-2 py-1 rounded"
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: Number(e.target.value) }))
            }
            className="w-full mb-2 border px-2 py-1 rounded"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className="w-full mb-2 border px-2 py-1 rounded"
          />
          <input
            placeholder="Inventory"
            type="number"
            value={form.inventory}
            onChange={(e) =>
              setForm((f) => ({ ...f, inventory: Number(e.target.value) }))
            }
            className="w-full mb-2 border px-2 py-1 rounded"
          />
          <input
            placeholder="Image URL (comma separated)"
            value={(form.images || []).join(",")}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                images: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="w-full mb-2 border px-2 py-1 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="w-full mb-2 border px-2 py-1 rounded"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              onClick={upsert}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="border px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">₹{p.price}</div>
            <div className="text-sm text-gray-500">Inv: {p.inventory}</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => startEdit(p)}
                className="px-2 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => removeProduct(p.id)}
                className="px-2 py-1 border rounded text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
