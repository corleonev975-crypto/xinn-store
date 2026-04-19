import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XINN STORE',
  description: 'Website top up premium dengan checkout AllPay dan QRIS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
