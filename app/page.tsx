import Header from '@/components/Header';
import Stats from '@/components/Stats';
import ProductCard from '@/components/ProductCard';
import CheckoutForm from '@/components/CheckoutForm';
import Footer from '@/components/Footer';
import { products, formatRupiah } from '@/lib/products';

const faqs = [
  {
    q: 'Apakah bisa bayar lewat QRIS?',
    a: 'Bisa. Template ini sudah menyiapkan alur checkout QRIS dan halaman invoice dengan QR code demo.'
  },
  {
    q: 'Apa itu AllPay di template ini?',
    a: 'AllPay ditampilkan sebagai kanal multi-payment. Untuk produksi, sambungkan ke payment gateway pilihanmu lewat webhook resmi.'
  },
  {
    q: 'Apakah ada dashboard admin?',
    a: 'Ada. Halaman admin menampilkan order, status, nominal, dan aksi proses / selesai.'
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <Header />

      <section className="hero-section">
        <div className="hero-copy">
          <div className="section-label">Premium Roblox Top Up</div>
          <h1>XINN STORE tampil premium, cepat, dan siap untuk deploy.</h1>
          <p>
            Desain original dengan struktur ala toko top up modern: hero besar, pilihan produk, checkout cepat,
            invoice QRIS, order tracker, dan dashboard admin.
          </p>
          <div className="hero-actions">
            <a href="#checkout" className="btn-primary">Top Up Sekarang</a>
            <a href="/order-status" className="btn-ghost">Cek Pesanan</a>
          </div>
          <div className="payment-strip">
            <span>QRIS</span>
            <span>AllPay</span>
            <span>Virtual Account</span>
            <span>E-Wallet</span>
            <span>Webhook Ready</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-banner">
            <div>
              <small>Top Up Robux</small>
              <strong>Lebih Premium dari Landing Page Biasa</strong>
              <p>Pilih paket mulai dari {formatRupiah(products[0].price)} sampai {formatRupiah(products[4].price)}.</p>
            </div>
            <div className="avatar-bubble">XS</div>
          </div>
          <div className="dashboard-mini">
            <div>
              <span>Saldo Simulasi</span>
              <strong>5.382</strong>
            </div>
            <div>
              <span>Transaksi sukses</span>
              <strong>19</strong>
            </div>
          </div>
          <div className="mini-list">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="mini-row">
                <span>{product.robux} Robux</span>
                <strong>{formatRupiah(product.price)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="layanan" className="feature-grid">
        {[
          ['Top up cepat', 'Alur checkout singkat dengan invoice instan.'],
          ['QRIS dinamis', 'Halaman pembayaran siap menampilkan QR code.'],
          ['Admin dashboard', 'Kelola order, ubah status, dan lihat ringkasan.'],
          ['API order', 'Sudah ada endpoint starter untuk create order dan webhook.']
        ].map(([title, text]) => (
          <article className="feature-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <Stats />

      <section id="produk" className="products-section">
        <div className="section-heading">
          <div>
            <div className="section-label">Best Seller</div>
            <h2>Paket top up siap dipilih</h2>
          </div>
          <p>Harga starter mengikuti kisaran nominal gift card/top up yang umum dijual di Indonesia.</p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      <CheckoutForm />

      <section className="testimonial-grid">
        <article className="quote-card">
          <div className="section-label">Keunggulan</div>
          <h2>Layout premium, original, dan siap kamu custom.</h2>
          <p>
            Struktur dibuat supaya gampang diubah ke identitas brand kamu sendiri tanpa menyalin elemen visual situs lain secara persis.
          </p>
        </article>
        <article className="quote-card dark">
          <div className="section-label">Teknis</div>
          <h2>Sudah ada halaman checkout, webhook stub, dan admin starter.</h2>
          <p>
            Tinggal isi env, sambungkan database dan gateway pembayaran resmi supaya bisa dipakai live.
          </p>
        </article>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-heading">
          <div>
            <div className="section-label">FAQ</div>
            <h2>Pertanyaan umum</h2>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
