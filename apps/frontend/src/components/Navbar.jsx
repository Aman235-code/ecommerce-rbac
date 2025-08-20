import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Products", path: "/" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          E-Shop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-gray-700 font-medium transition group ${
                location.pathname === link.path ? "text-indigo-600" : ""
              }`}
            >
              {link.name}
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}

          {/* Orders link only for logged-in users */}
          {user && (
            <Link
              to="/orders"
              className={`relative text-gray-700 font-medium transition group ${
                location.pathname === "/orders" ? "text-indigo-600" : ""
              }`}
            >
              Orders
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full group-hover:left-0"></span>
            </Link>
          )}
        </div>

        {/* User actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-gray-700">
                <FaUserCircle className="text-xl text-indigo-500" />
                <span className="text-sm font-medium">
                  {user.email} ({user.role})
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-red-400 transition"
              >
                Logout
              </button>

              {/* Show cart only for non-admin users */}
              {user.role !== "ADMIN" && (
                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-indigo-600 transition"
                >
                  <FaShoppingCart className="text-2xl" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-500 text-white px-4 py-1 rounded-lg hover:bg-indigo-600 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 text-2xl focus:outline-none"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`relative text-gray-700 font-medium transition group ${
                location.pathname === link.path ? "text-indigo-600" : ""
              }`}
            >
              {link.name}
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}

          {/* Orders link for mobile */}
          {user && (
            <Link
              to="/orders"
              onClick={() => setMobileOpen(false)}
              className={`relative text-gray-700 font-medium transition group ${
                location.pathname === "/orders" ? "text-indigo-600" : ""
              }`}
            >
              Orders
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full group-hover:left-0"></span>
            </Link>
          )}

          {user ? (
            <>
              <div className="flex items-center gap-2 text-gray-700">
                <FaUserCircle className="text-xl text-indigo-500" />
                <span className="text-sm font-medium">
                  {user.email} ({user.role})
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>

              {/* Show cart only for non-admin users */}
              {user.role !== "ADMIN" && (
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="relative text-gray-700 hover:text-indigo-600 transition"
                >
                  <FaShoppingCart className="text-2xl" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="bg-indigo-500 text-white px-4 py-1 rounded-lg hover:bg-indigo-600 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
