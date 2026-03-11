import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';

// GET /api/products?category=Home&limit=4
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '100');

  let result = products;
  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }
  result = result.slice(0, limit);

  return NextResponse.json({
    products: result,
    total: result.length,
    categories: [...new Set(products.map(p => p.category))],
  });
}
