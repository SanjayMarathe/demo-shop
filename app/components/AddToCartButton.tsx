"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button onClick={handleClick}>{added ? "Added!" : "Add to Cart"}</button>
  );
}
