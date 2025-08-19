import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 && <div>No orders yet</div>}
      {orders.map((order) => (
        <div key={order.id} className="mb-4 p-4 border rounded">
          <div className="font-semibold">Order #{order.id}</div>
          <div>Status: {order.status}</div>
          <div>Total: ₹{order.total}</div>
          <div className="mt-2">
            {order.items.map((i) => (
              <div key={i.id} className="flex justify-between">
                <div>
                  {i.product.name} × {i.quantity}
                </div>
                <div>₹{(i.product.price * i.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
