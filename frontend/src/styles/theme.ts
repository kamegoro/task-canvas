import { createTheme, type PaletteMode, type Theme } from '@mui/material';

// oklch()指定だとMUIの内部カラー演算(theme.alpha等)が実行時に落ちるため、値はsRGB hexに変換済み。
export type DesignTokens = {
  bg: string;
  textPrimary: string;
  textSecondary: string;
  textFaded: string;
  divider: string;
  dividerFaint: string;
  checkboxBorder: string;
  track: string;
  accent: string;
  accentHover: string;
  accentActive: string;
  accentOn: string;
};

const lightTokens: DesignTokens = {
  bg: '#F9F6F2',
  textPrimary: '#1E1A16',
  textSecondary: '#68625E',
  textFaded: '#9D9792',
  divider: '#D3CCC7',
  dividerFaint: '#EBE7E4',
  checkboxBorder: '#BCB6B1',
  track: '#E2DDD9',
  accent: '#3E5FAD',
  accentHover: '#2E4D99',
  accentActive: '#5477C7',
  accentOn: '#FCFCFC',
};

const darkTokens: DesignTokens = {
  bg: '#111419',
  textPrimary: '#E5E8EC',
  textSecondary: '#83868B',
  textFaded: '#616368',
  divider: '#2E333B',
  dividerFaint: '#252930',
  checkboxBorder: '#51565C',
  track: '#2A2E35',
  accent: '#A4E550',
  accentHover: '#8ECE34',
  accentActive: '#B3F662',
  accentOn: '#111419',
};

declare module '@mui/material/styles' {
  interface Palette {
    tokens: DesignTokens;
  }

  interface PaletteOptions {
    tokens: DesignTokens;
  }
}

export const getDesignTokens = (mode: PaletteMode): DesignTokens =>
  mode === 'dark' ? darkTokens : lightTokens;

export const createAppTheme = (mode: PaletteMode): Theme => {
  const tokens = getDesignTokens(mode);

  return createTheme({
    typography: {
      fontFamily: 'var(--font-manrope), sans-serif',
    },
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
      mode,
      tokens,
      background: {
        default: tokens.bg,
        paper: tokens.bg,
      },
      text: {
        primary: tokens.textPrimary,
        secondary: tokens.textSecondary,
        disabled: tokens.textFaded,
      },
      divider: tokens.divider,
      primary: {
        main: tokens.accent,
        light: tokens.accentActive,
        dark: tokens.accentHover,
        contrastText: tokens.accentOn,
      },
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
};

export default createAppTheme('light');
