import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BrandColors {
    primary: string;
    white: string;
    error: string;
  }

  interface BrandColorOptions {
    primary?: string;
    white?: string;
    error?: string;
  }

  interface GrayColors {
    text: string;
    background: string;
  }

  interface GrayColorOptions {
    text?: string;
    background?: string;
  }

  interface IconColors {
    blue: string;
  }

  interface IconColorOptions {
    blue?: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    brand: BrandColors;
    gray: GrayColors;
    icon: IconColors;
  }

  interface PaletteOptions {
    brand: BrandColorOptions;
    gray: GrayColorOptions;
    icon: IconColorOptions;
  }
}

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // NOTE: ボタンテキストのアルファベットが自動で大文字になる設定をOFF
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1565C0',
      light: '#1976D2',
      dark: '#0D47A1',
    },
    brand: {
      primary: '#1565C0',
      white: '#FFFFFF',
      error: '#D32F2F',
    },
    gray: {
      text: '#262626',
      background: '#fafafa',
    },
    icon: {
      blue: '#1565C0',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2.75rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
});
