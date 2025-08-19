import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

beforeEach(() => {
  localStorage.setItem("token", "fake-token");

  // fresh fetch mock before every test
  global.fetch = jest.fn();
});

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext (API)", () => {
  test("fetches cart on mount if user exists", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: "Test", price: 100, quantity: 1 }],
    });

    const { result } = renderHook(() => useCart(), { wrapper });

    // let React finish updating
    await act(async () => {});

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/cart", {
      headers: { Authorization: "Bearer fake-token" },
    });
    expect(result.current.cart).toEqual([
      { id: 1, name: "Test", price: 100, quantity: 1 },
    ]);
  });

  test("adds to cart successfully", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: "Test", price: 100, quantity: 1 }],
    });

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart({ id: 1, name: "Test", price: 100 });
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  test("removes from cart", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => [] });

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.removeFromCart(1);
    });

    expect(result.current.cart).toEqual([]);
  });

  test("clears cart", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => [] });

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
  });

  test("increases quantity", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: "Test", price: 100, quantity: 2 }],
    });

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart({ id: 1, name: "Test", price: 100 });
    });

    expect(result.current.cart[0].quantity).toBe(2);
  });

  test("decreases quantity to remove item", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.decreaseQuantity(1);
    });

    expect(result.current.cart).toEqual([]);
  });
});
