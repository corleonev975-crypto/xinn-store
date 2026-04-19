import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrder } from '@/lib/order-store';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID order wajib diisi.' }, { status: 400 });

  const order = getOrder(id);
  if (!order) return NextResponse.json({ error: 'Order tidak ditemukan.' }, { status: 404 });
  return NextResponse.json({ order });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, customerName, whatsapp, paymentMethod } = body;

  if (!productId || !customerName || !whatsapp || !paymentMethod) {
    return NextResponse.json({ error: 'Data order belum lengkap.' }, { status: 400 });
  }

  try {
    const order = createOrder({ productId, customerName, whatsapp, paymentMethod });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Gagal membuat order.' }, { status: 400 });
  }
}
