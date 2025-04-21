'use client';

import { ThemeProvider } from '@mui/material';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import DiProvider from '@/context/DIContext';
import theme from '@/styles/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <DiProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </DiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
