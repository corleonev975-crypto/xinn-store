'use client';

import { useState } from 'react';

type LookupResult = {
  id: string;
  customerName: string;
  robux: number;
  amount: number;
  status: string;
  paymentChannelLabel: string;
  notes: string[];
};

export default function OrderStatusPage() {
  const [id, setId] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setResult(null);
    const res = await fetch(`/api/orders?id=${id}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Order tidak ditemukan');
      return;
    }
    setResult(data.order);
  }

  return (
    <main className="simple-page">
      <div className="lookup-card">
        <div className="section-label">Cek Pesanan</div>
        <h1>Masukkan ID order</h1>
        <form onSubmit={handleSubmit} className="lookup-form">
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Contoh: XNABC123" required />
          <button className="btn-primary">Cari</button>
        </form>
        {error ? <div className="error-box">{error}</div> : null}
        {result ? (
          <div className="lookup-result">
            <div><span>ID Order</span><strong>{result.id}</strong></div>
            <div><span>Username</span><strong>{result.customerName}</strong></div>
            <div><span>Paket</span><strong>{result.robux} Robux</strong></div>
            <div><span>Metode</span><strong>{result.paymentChannelLabel}</strong></div>
            <div><span>Status</span><strong className={`status-pill ${result.status}`}>{result.status}</strong></div>
            <ul>
              {result.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    </main>
  );
}
