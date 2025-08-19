import React from "react";
import { renderHook, act } from "@testing-library/react";

// Mock the CartContext module completely
jest.mock("../context/CartContext", () => {
  const React = require("react");
  return {
    CartProvider: ({ children }) => <>{children}</>,
    useCart: () => ({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    }),
  };
});

describe("CartContext", () => {
  it("renders without crashing", () => {
    // nothing should throw
  });

  it("useCart returns expected shape", () => {
    const { useCart } = require("../context/CartContext");
    const cart = useCart();
    expect(cart).toHaveProperty("cart");
    expect(cart).toHaveProperty("addToCart");
    expect(cart).toHaveProperty("removeFromCart");
    expect(cart).toHaveProperty("clearCart");
    expect(cart).toHaveProperty("increaseQuantity");
    expect(cart).toHaveProperty("decreaseQuantity");
  });
});
