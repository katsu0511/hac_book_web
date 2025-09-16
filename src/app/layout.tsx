import './globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import { AuthProvider } from './context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';

const fnt = Inconsolata({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hac Book',
  description: 'Web App for Hac Book',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={fnt.className}>
        <AuthProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
