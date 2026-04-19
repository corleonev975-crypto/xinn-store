import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/order-store';

async function parseBody(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return req.json();
  }
  const formData = await req.formData();
  return Object.fromEntries(formData.entries());
}

export async function POST(req: NextRequest) {
  const body = await parseBody(req);
  const id = String(body.id || '');
  const status = String(body.status || '');

  if (!id || !status) {
    return NextResponse.json({ error: 'id dan status wajib diisi.' }, { status: 400 });
  }

  const noteMap: Record<string, string> = {
    paid: 'Webhook pembayaran diterima.',
    processing: 'Admin mulai memproses order.',
    done: 'Order ditandai selesai oleh admin.',
    failed: 'Order ditandai gagal.'
  };

  const order = updateOrderStatus(id, status as never, noteMap[status] || 'Status diperbarui.');
  if (!order) return NextResponse.json({ error: 'Order tidak ditemukan.' }, { status: 404 });

  const acceptsHtml = (req.headers.get('accept') || '').includes('text/html');
  if (acceptsHtml) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.json({ ok: true, order });
}
