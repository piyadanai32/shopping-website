import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/products/[id]
export async function GET(request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop(), 10);
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });
    if (product) {
      return new Response(JSON.stringify(product), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Error fetching product" }), { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(request) {
  const { id, name, price, description, image } = await request.json();
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description, image },
    });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: "Error updating product" }), { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await prisma.product.delete({
      where: { id },
    });
    return new Response(JSON.stringify({ message: "Product deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: "Error deleting product" }), { status: 500 });
  }
}
