import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <CartProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
      <App />
    </CartProvider>
  </AuthProvider>
  // </React.StrictMode>
);
