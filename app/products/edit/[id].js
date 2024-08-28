import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
