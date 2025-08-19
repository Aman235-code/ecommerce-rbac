import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaDollarSign,
  FaBoxes,
  FaImage,
  FaTag,
  FaEdit,
  FaTrash,
  FaAlignLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null); 
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0,
    image: "",
  });


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

 
  async function fetchProducts() {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    if (user?.role === "ADMIN") fetchProducts();
  }, [user]);


  async function upsert() {
    if (!form.name || !form.price) return;

    const url = editing?.id
      ? `${import.meta.env.VITE_API_URL}/products/update/${editing.id}`
      : `${import.meta.env.VITE_API_URL}/products/add`;

    const method = editing?.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const newProduct = await res.json();

    if (editing?.id) {
      toast.success("Product Updated Successfully");
      setProducts(products.map((p) => (p.id === editing.id ? newProduct : p)));
    } else {
      toast.success("Product Added Successfully");
      setProducts([newProduct, ...products]);
    }

    setEditing(null);
    setForm({
      name: "",
      description: "",
      price: 0,
      category: "",
      inventory: 0,
      image: "",
    });
  }

  async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`${import.meta.env.VITE_API_URL}/products/delete/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Product Deleted Successfully");
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  }

  if (!user || user.role !== "ADMIN")
    return (
      <div className="p-6 text-red-600 font-semibold">
        Forbidden — admin only
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {editing?.id ? "Update Product" : "Admin — Products"}
      </h2>

      {!editing && (
        <button
          onClick={() => setEditing({})}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mb-4 flex items-center gap-2"
        >
          <FaTag /> Add Product
        </button>
      )}


      {editing && (
        <div className="bg-white p-6 shadow-md mb-6 rounded-md space-y-4">
          <h3 className="text-xl font-semibold mb-4">
            {editing?.id ? "Update Product" : "Add Product"}
          </h3>

          <div className="flex flex-col gap-3">
            <div>
              <h4 className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <FaTag /> Product Name
              </h4>
              <input
                placeholder="Enter product name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <h4 className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <FaDollarSign /> Price
              </h4>
              <input
                type="number"
                placeholder="Enter price"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <h4 className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <FaTag /> Category
              </h4>
              <input
                placeholder="Enter category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <h4 className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <FaBoxes /> Inventory
              </h4>
              <input
                type="number"
                placeholder="Enter inventory"
                min={0}
                value={form.inventory}
                onChange={(e) =>
                  setForm((f) => ({ ...f, inventory: Number(e.target.value) }))
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <h4 className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <FaImage /> Image URL
              </h4>
              <input
                placeholder="Enter image URL (e.g., /images/product1.jpg)"
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <h4 className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                <FaAlignLeft /> Description
              </h4>
              <textarea
                placeholder="Enter product description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows="3"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={upsert}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
            >
              {editing?.id ? "Update Product" : "Add Product"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="border px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

   
      <div className="grid md:grid-cols-3 gap-6">
        {loading
          ? Array(itemsPerPage)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse h-52 rounded shadow"
                ></div>
              ))
          : paginatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-48 md:h-40 object-cover mb-3 rounded-sm"
                  />
                )}

                <div className="font-semibold text-lg mb-1">{p.name}</div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaDollarSign /> ₹{p.price}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <FaBoxes />
                  <span
                    className={p.inventory <= 5 ? "text-red-600 font-semibold" : ""}
                  >
                    {p.inventory}
                  </span>
                </div>

                {p.category && (
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaTag /> {p.category}
                  </div>
                )}
                {p.description && (
                  <div className="text-gray-500 text-justify text-sm mb-2">
                    {p.description}
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setForm(p);
                    }}
                    className="flex-1 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="flex-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition flex items-center justify-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

  
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
