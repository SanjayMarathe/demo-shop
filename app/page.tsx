import { products } from "@/lib/products";
import AddToCartButton from "./components/AddToCartButton";

export default function HomePage() {
  return (
    <main>
      <h1>Demo Shop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-placeholder">
              {product.name.charAt(0)}
            </div>
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
