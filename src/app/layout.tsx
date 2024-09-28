'use client';
import { Roboto_Slab } from 'next/font/google';
import '@/scss/main.scss';
import { SWRConfig } from 'swr';
import ToastProvider from '@/providers/toast';
import Network from './network';

const robotoSlab = Roboto_Slab({
  weight: ['400', '500', '600', '700', '800'],
  style: 'normal',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={robotoSlab.className}>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            keepPreviousData: true,
            shouldRetryOnError: false,
          }}>
          <ToastProvider>
            <Network />
            {children}
          </ToastProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
