import Link from 'next/link';
import { orderStore, updateOrderStatus } from '@/lib/order-store';
import { formatRupiah } from '@/lib/products';

async function updateStatus(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '');
  const noteMap: Record<string, string> = {
    processing: 'Admin mulai memproses order.',
    done: 'Order ditandai selesai oleh admin.'
  };
  updateOrderStatus(id, status as never, noteMap[status] || 'Status diperbarui.');
}

export default function AdminPage() {
  const totalRevenue = orderStore
    .filter((o) => ['paid', 'processing', 'done'].includes(o.status))
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <div>
          <div className="section-label">Dashboard Admin</div>
          <h1>Kelola order XINN STORE</h1>
        </div>
        <Link href="/" className="btn-ghost">Kembali ke homepage</Link>
      </div>

      <section className="stats-grid admin-stats">
        <div className="stat-card"><strong>{orderStore.length}</strong><span>Total order</span></div>
        <div className="stat-card"><strong>{orderStore.filter((o) => o.status === 'pending').length}</strong><span>Pending</span></div>
        <div className="stat-card"><strong>{orderStore.filter((o) => o.status === 'paid').length}</strong><span>Paid</span></div>
        <div className="stat-card"><strong>{formatRupiah(totalRevenue)}</strong><span>Revenue tercatat</span></div>
      </section>

      <section className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Paket</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orderStore.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}<br /><small>{order.whatsapp}</small></td>
                <td>{order.robux} Robux</td>
                <td>{order.paymentChannelLabel}</td>
                <td>{formatRupiah(order.amount)}</td>
                <td><span className={`status-pill ${order.status}`}>{order.status}</span></td>
                <td>
                  <div className="admin-actions">
                    <form action={updateStatus}>
                      <input type="hidden" name="id" value={order.id} />
                      <input type="hidden" name="status" value="processing" />
                      <button className="mini-btn">Proses</button>
                    </form>
                    <form action={updateStatus}>
                      <input type="hidden" name="id" value={order.id} />
                      <input type="hidden" name="status" value="done" />
                      <button className="mini-btn success">Selesai</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
