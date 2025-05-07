'use client';

import { ThemeProvider } from '@mui/material';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import DiProvider from '@/context/DIContext';
import theme from '@/styles/theme';
import Box from '@/_components/mui/Box';

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
            <SnackbarProvider>
              <Box suppressContentEditableWarning>{children}</Box>
            </SnackbarProvider>
          </DiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
