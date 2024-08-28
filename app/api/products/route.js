import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/products
export async function GET(request) {
  try {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Error fetching products" }), { status: 500 });
  }
}

// POST /api/products
export async function POST(request) {
  const { name, price, description, image } = await request.json();
  try {
    const product = await prisma.product.create({
      data: { name, price, description, image },
    });
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ error: "Error creating product" }), { status: 500 });
  }
}
