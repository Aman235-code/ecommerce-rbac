import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-indigo-600">E-Shop</Link>

        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Products</Link>
          <Link to="/admin" className="text-gray-700 hover:text-indigo-600">Admin</Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <div className="text-sm text-gray-700">Hi, {user.email} ({user.role})</div>
              <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-indigo-600">Signup</Link>
            </>
          )}

          <Link to="/cart" className="relative">
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
