'use client';

import { ThemeProvider } from '@mui/material';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import { UserProvider } from '@/_components/contexts/UserContext';
import Box from '@/_components/mui/Box';
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
            <UserProvider>
              <SnackbarProvider>
                <Box suppressContentEditableWarning>{children}</Box>
              </SnackbarProvider>
            </UserProvider>
          </DiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
