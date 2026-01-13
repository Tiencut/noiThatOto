import './styles/globals.css';
import React from 'react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Layout/Header'), { ssr: false });
const Footer = dynamic(() => import('../components/Layout/Footer'), { ssr: false });

export const metadata = {
  title: 'CarDecor Oto Affiliate',
  description: 'Chọn phụ kiện nội thất ô tô - So sánh giá, affiliate links',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* GA4 placeholder - add NEXT_PUBLIC_GA_ID in env for real tracking */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXX'}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXX'}');
        `
          }}
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Header component */}
          {/* @ts-ignore - client component in layout */}
          <Header />

          <main className="flex-1 container py-8">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}