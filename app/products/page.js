"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <div>
                <img src={product.image} alt={product.name} width="100" />
                <h2>{product.name}</h2>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
