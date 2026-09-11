"use client";

import { useEffect, useState } from "react";
import { getCart, cartTotal, clearCart, type CartItem } from "@/lib/cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cartTotal(cart);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, cardNumber, items: cart, total }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    await res.json();
    clearCart();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <main>
        <h1>Order placed!</h1>
        <p>
          Thanks, {name}. A confirmation has been sent to {email}.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>
      <p>Total: ${total.toFixed(2)}</p>

      {status === "error" && (
        <p className="error-banner">Something went wrong. Please try again.</p>
      )}

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Card Number
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </label>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
