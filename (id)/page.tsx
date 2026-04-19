import Link from 'next/link';
import QRCode from 'qrcode';
import { getOrder } from '@/lib/order-store';
import { formatRupiah } from '@/lib/products';

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  const order = getOrder(params.id);

  if (!order) {
    return (
      <main className="simple-page">
        <h1>Order tidak ditemukan</h1>
        <Link href="/" className="btn-primary">Kembali</Link>
      </main>
    );
  }

  const qrDataUrl = await QRCode.toDataURL(order.qrPayload, { margin: 1, width: 260 });

  return (
    <main className="invoice-shell">
      <section className="invoice-panel">
        <div>
          <div className="section-label">Checkout</div>
          <h1>Selesaikan pembayaran</h1>
          <p>Order ID <strong>{order.id}</strong> • metode <strong>{order.paymentChannelLabel}</strong></p>

          <div className="invoice-list">
            <div><span>Username Roblox</span><strong>{order.customerName}</strong></div>
            <div><span>WhatsApp</span><strong>{order.whatsapp}</strong></div>
            <div><span>Paket</span><strong>{order.robux} Robux</strong></div>
            <div><span>Total</span><strong>{formatRupiah(order.amount)}</strong></div>
            <div><span>Status</span><strong className={`status-pill ${order.status}`}>{order.status}</strong></div>
          </div>

          <div className="invoice-actions">
            <form action="/api/webhook" method="post">
              <input type="hidden" name="id" value={order.id} />
              <input type="hidden" name="status" value="paid" />
              <button className="btn-primary">Simulasikan Pembayaran Berhasil</button>
            </form>
            <Link href="/admin" className="btn-ghost">Buka Dashboard Admin</Link>
          </div>

          <p className="small-note">Mode demo: tombol simulasi dipakai untuk menguji alur paid → processing → done.</p>
        </div>

        <aside className="qris-card">
          <div className="qris-head">
            <span>{order.paymentMethod === 'qris' ? 'QRIS All Payment' : 'AllPay Checkout'}</span>
            <strong>{formatRupiah(order.amount)}</strong>
          </div>
          <img src={qrDataUrl} alt="QRIS" className="qr-image" />
          <div className="small-note">Scan QR ini untuk preview tampilan invoice. Untuk live, ganti dengan QR dari gateway resmi.</div>
        </aside>
      </section>
    </main>
  );
}
