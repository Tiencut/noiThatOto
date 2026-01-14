import './styles/globals.css';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

export const metadata = {
  title: 'CarDecor Oto Affiliate',
  description: 'Chọn phụ kiện nội thất ô tô - So sánh giá, affiliate links',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* GA4 placeholder - add NEXT_PUBLIC_GA_ID in env for real tracking; only load in production */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
