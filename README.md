# Demo Shop

Small throwaway storefront used to test an error-capture extension. Not
real, not production quality — hardcoded products, no database, no real
payment processing.

## Running it

```bash
npm install
npm run dev
```

Opens on [http://localhost:3001](http://localhost:3001) (port 3000 was already
taken by another local project).

## Pages

- `/` — product list, "Add to Cart" buttons
- `/cart` — cart contents, "Save cart for later", "Checkout"
- `/checkout` — name/email/card form, "Place Order"

## Seeded bugs

Three bugs are seeded on purpose for demoing the capture extension. Each is
a real bug (a genuine unhandled exception or a real missing route), not a
simulated one.

1. **500 — checkout crashes on large orders.** Add enough items to the cart
   to push the total over $500 (e.g. 4K Monitor + Ergonomic Chair =
   $599.98), go to `/checkout`, fill in any name/valid email/card number,
   and click **Place Order**. The API route (`app/api/checkout/route.ts`)
   throws an unhandled `TypeError` reading a property off `undefined` when
   the order total exceeds $500.

2. **400 — bad email reaches the server.** On `/checkout`, enter anything
   without a valid email shape in the Email field (e.g. `notanemail`), keep
   the cart total under $500, and click **Place Order**. The form does no
   client-side email validation, so the request reaches the server and the
   API route returns a real 400 with `{"error": "Invalid email address"}`.
   The page shows a "Something went wrong" banner.

3. **Console + network error — save cart for later.** On `/cart` with at
   least one item in the cart, click **Save cart for later**. It calls
   `fetch('/api/save-cart', ...)`, but that route doesn't exist (only
   `/api/checkout` does), so it's a real 404 in the network tab and an
   uncaught error in the console when the response body is parsed as JSON.
