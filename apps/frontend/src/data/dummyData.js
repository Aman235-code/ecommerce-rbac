// dummyData.js - initial products. Admin edits stored into localStorage at runtime.
export const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with long battery life.",
    price: 79.99,
    category: "Electronics",
    inventory: 50,
    images: [
      "https://placehold.co/600x400?text=Headphones+1",
      "https://placehold.co/600x400?text=Headphones+2",
    ],
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Tactile switches, RGB backlight, compact layout.",
    price: 99.99,
    category: "Electronics",
    inventory: 30,
    images: ["https://placehold.co/600x400?text=Keyboard"],
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Lightweight daily trainers with breathable mesh.",
    price: 59.99,
    category: "Sports",
    inventory: 70,
    images: ["https://placehold.co/600x400?text=Shoes"],
  },
  {
    id: 4,
    name: "Coffee Grinder",
    description: "Burr grinder for consistent grounds and better extraction.",
    price: 39.99,
    category: "Home",
    inventory: 40,
    images: ["https://placehold.co/600x400?text=Grinder"],
  },
  {
    id: 5,
    name: "Smart Watch",
    description: "Heart-rate, notifications, and 7-day battery.",
    price: 129.99,
    category: "Electronics",
    inventory: 20,
    images: ["https://placehold.co/600x400?text=Watch"],
  },
  // ... add more items to test pagination
];
