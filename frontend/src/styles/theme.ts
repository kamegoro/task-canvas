import { createTheme, type PaletteMode, type Theme } from '@mui/material';

// NOTE: デザイントークン (issue #1411)。ライト/ダークで配色のみ切り替え、レイアウト・書体は共通。
//
// issue の指定値は oklch() だが、@mui/material の内部カラー演算 (theme.alpha/lighten/darken が
// 使う decomposeColor) は oklch() を解釈できず、Button/Chip/MenuItem など多数のコンポーネントが
// variant に関わらず `theme.alpha(palette[color].main, ...)` を無条件に評価するため、
// oklch() を palette にそのまま渡すとブラウザでの実行時に "MUI error #9" で落ちる
// (theme.colorSpace を設定して alpha/lighten/darken を CSS の color-mix() 経由にする回避策も
// 試したが、e2e (実ブラウザ) では再現して直らなかったため採用していない)。
// そのため各トークンは issue の oklch 値をブラウザの実カラーエンジン (canvas 2D の
// fillStyle→getImageData) で厳密に sRGB hex へ変換した値を使う。見た目は oklch 指定と同一。
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
  bg: '#F9F6F2', // oklch(0.975 0.006 80)
  textPrimary: '#1E1A16', // oklch(0.22 0.01 60)
  textSecondary: '#68625E', // oklch(0.5 0.01 60)
  textFaded: '#9D9792', // oklch(0.68 0.01 60)
  divider: '#D3CCC7', // oklch(0.85 0.01 60)
  dividerFaint: '#EBE7E4', // oklch(0.93 0.006 60)
  checkboxBorder: '#BCB6B1', // oklch(0.78 0.01 60)
  track: '#E2DDD9', // oklch(0.9 0.008 60)
  accent: '#3E5FAD', // oklch(0.5 0.13 265)
  accentHover: '#2E4D99', // oklch(0.44 0.13 265)
  accentActive: '#5477C7', // oklch(0.58 0.13 265)
  accentOn: '#FCFCFC', // oklch(0.99 0 0)
};

const darkTokens: DesignTokens = {
  bg: '#111419', // oklch(0.19 0.012 260)
  textPrimary: '#E5E8EC', // oklch(0.93 0.006 260)
  textSecondary: '#83868B', // oklch(0.62 0.008 260)
  textFaded: '#616368', // oklch(0.5 0.008 260)
  divider: '#2E333B', // oklch(0.32 0.016 260)
  dividerFaint: '#252930', // oklch(0.28 0.014 260)
  checkboxBorder: '#51565C', // oklch(0.45 0.012 260)
  track: '#2A2E35', // oklch(0.3 0.014 260)
  accent: '#A4E550', // oklch(0.85 0.19 130)
  accentHover: '#8ECE34', // oklch(0.78 0.19 130)
  accentActive: '#B3F662', // oklch(0.9 0.19 130)
  accentOn: '#111419', // oklch(0.19 0.012 260)
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
