import { createTheme, type PaletteMode, type Theme } from '@mui/material';

// NOTE: デザイントークン (issue #1411)。ライト/ダークで配色のみ切り替え、レイアウト・書体は共通。
// oklch() は @mui/material の内部カラー演算 (theme.alpha/lighten/darken が使う decomposeColor) が
// 対応していないため、augmentColor が触る palette.primary は light/dark/contrastText を必ず明示する。
// さらに Button/Chip/MenuItem など多数のコンポーネントが variant に関わらず
// `theme.alpha(palette[color].main, ...)` を無条件に評価するため、theme.colorSpace を設定して
// alpha/lighten/darken の実装を decomposeColor ベースから CSS の color-mix()/相対カラー構文に
// 切り替える (createThemeNoVars 内の attachColorManipulators を参照)。
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
  bg: 'oklch(0.975 0.006 80)',
  textPrimary: 'oklch(0.22 0.01 60)',
  textSecondary: 'oklch(0.5 0.01 60)',
  textFaded: 'oklch(0.68 0.01 60)',
  divider: 'oklch(0.85 0.01 60)',
  dividerFaint: 'oklch(0.93 0.006 60)',
  checkboxBorder: 'oklch(0.78 0.01 60)',
  track: 'oklch(0.9 0.008 60)',
  accent: 'oklch(0.5 0.13 265)',
  accentHover: 'oklch(0.44 0.13 265)',
  accentActive: 'oklch(0.58 0.13 265)',
  accentOn: 'oklch(0.99 0 0)',
};

const darkTokens: DesignTokens = {
  bg: 'oklch(0.19 0.012 260)',
  textPrimary: 'oklch(0.93 0.006 260)',
  textSecondary: 'oklch(0.62 0.008 260)',
  textFaded: 'oklch(0.5 0.008 260)',
  divider: 'oklch(0.32 0.016 260)',
  dividerFaint: 'oklch(0.28 0.014 260)',
  checkboxBorder: 'oklch(0.45 0.012 260)',
  track: 'oklch(0.3 0.014 260)',
  accent: 'oklch(0.85 0.19 130)',
  accentHover: 'oklch(0.78 0.19 130)',
  accentActive: 'oklch(0.9 0.19 130)',
  accentOn: 'oklch(0.19 0.012 260)',
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

  const theme = createTheme({
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

  // NOTE: createTheme() のオプションに渡した colorSpace は palette 側にしか伝播しないため、
  // theme.alpha/lighten/darken (theme.colorSpace を見る) が decomposeColor を使わないよう手動で設定する。
  return Object.assign(theme, { colorSpace: 'oklch' });
};

export default createAppTheme('light');
