'use client';

import { Manrope } from 'next/font/google';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import { ThemeModeProvider } from '@/_components/contexts/ThemeModeContext';
import { UserProvider } from '@/_components/contexts/UserContext';
import Box from '@/_components/mui/Box';
import AppHeader from '@/_components/organisms/AppHeader';
import DiProvider from '@/context/DIContext';
import QueryProvider from '@/context/QueryContext';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={manrope.variable}
    >
      <body style={{ margin: 0, fontFamily: 'var(--font-manrope), sans-serif' }}>
        <ThemeModeProvider>
          <QueryProvider>
            <DiProvider>
              <UserProvider>
                <SnackbarProvider>
                  <AppHeader />
                  <Box
                    sx={{
                      width: '100%',
                      minHeight: '100vh',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    suppressContentEditableWarning
                  >
                    {children}
                  </Box>
                </SnackbarProvider>
              </UserProvider>
            </DiProvider>
          </QueryProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
