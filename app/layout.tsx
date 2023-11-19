import './globals.css';

import { Inter as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
});

import ToasterProvider from '@/components/providers/toaster-provider';
import ModalProvider from '@/components/providers/modal-provider';
import UserProvider from '@/components/providers/user-provider';
import { ThemeProvider } from '@/components/theme-provider';
import SupabaseProvider from '@/components/providers/supabase-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';

import Navbar from '@/components/navbar';
import BottomBar from '@/components/bottom-bar';

export const metadata = {
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <SupabaseProvider>
          <UserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ConfettiProvider />
              <ToasterProvider />
              <ModalProvider />
              <Navbar />
              <div>{children}</div>
              <BottomBar />
            </ThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
