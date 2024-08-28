"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      }

      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => router.push(`/products/edit/${id}`)}>Edit</button>
      <button onClick={async () => {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        router.push('/products');
      }}>Delete</button>
    </div>
  );
}
