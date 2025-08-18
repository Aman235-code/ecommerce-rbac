import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    if (!user) setOrders([]);
    else setOrders(all.filter((o) => o.userId === user.id));
  }, [user]);

  if (!user) return <div className="p-6">Please login to view orders.</div>;

  if (orders.length === 0) return <div className="p-6">No orders yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      {orders.map((o) => (
        <div key={o.id} className="border p-4 rounded-lg">
          <div className="flex justify-between">
            <div>Order #{o.id}</div>
            <div className="font-semibold">{o.status}</div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(o.createdAt).toLocaleString()}
          </div>
          <ul className="mt-2 list-disc ml-6">
            {o.items.map((it, idx) => (
              <li key={idx}>
                {it.quantity} × {it.name} — ₹{it.unitPrice}
              </li>
            ))}
          </ul>
          <div className="mt-2 font-semibold">Total: ₹{o.total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
