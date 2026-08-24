'use client';

import { ThemeProvider } from '@mui/material';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import { UserProvider } from '@/_components/contexts/UserContext';
import Box from '@/_components/mui/Box';
import AppHeader from '@/_components/organisms/AppHeader';
import DiProvider from '@/context/DIContext';
import QueryProvider from '@/context/QueryContext';
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
          <QueryProvider>
            <DiProvider>
              <UserProvider>
                <SnackbarProvider>
                  <AppHeader />
                  <Box
                    sx={{
                      width: '100vw',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    suppressContentEditableWarning
                  >
                    {children}
                  </Box>
                </SnackbarProvider>
              </UserProvider>
            </DiProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
