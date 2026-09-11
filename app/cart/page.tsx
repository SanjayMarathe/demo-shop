"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, cartTotal, type CartItem } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
  }, []);

  async function handleSaveForLater() {
    const res = await fetch("/api/save-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    console.log("cart saved", data);
  }

  const total = cartTotal(cart);

  return (
    <main>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
      <div className="cart-actions">
        <button className="secondary" onClick={handleSaveForLater}>
          Save cart for later
        </button>
        <button onClick={() => router.push("/checkout")} disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </main>
  );
}
