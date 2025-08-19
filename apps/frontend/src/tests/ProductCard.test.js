import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // <-- add this
import ProductCard from "../components/ProductCard";

const mockAddToCart = jest.fn();

jest.mock("../context/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    description: "This is a test product",
    price: 99.99,
    image: "https://via.placeholder.com/150",
    inventory: 5,
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it("renders product details correctly", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} user={{ role: "USER" }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText(/Available: 5/)).toBeInTheDocument();
  });

  it("shows Add to Cart button for USER role", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} user={{ role: "USER" }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("does not show Add to Cart button for ADMIN role", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} user={{ role: "ADMIN" }} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
  });

  it("calls addToCart when Add to Cart button is clicked", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} user={{ role: "USER" }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
