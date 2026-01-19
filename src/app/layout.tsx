import './globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth/AuthContext';
import ThemeProviderWrapper from '@/components/Templates/ThemeProviderWrapper';
import Header from '@/components/Organisms/Header';
import Main from '@/components/Templates/Main';
import Footer from '@/components/Organisms/Footer';

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
          <ThemeProviderWrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </ThemeProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
