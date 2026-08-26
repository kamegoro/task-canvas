'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { CssBaseline, type PaletteMode, ThemeProvider } from '@mui/material';

import { createAppTheme } from '@/styles/theme';

const STORAGE_KEY = 'task-canvas-theme-mode';

type ThemeModeContextValue = {
  mode: PaletteMode;
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export const useThemeMode = (): ThemeModeContextValue => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

const isPaletteMode = (value: string | null): value is PaletteMode =>
  value === 'light' || value === 'dark';

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  // NOTE: SSR時はサーバー/クライアントのHTML不一致を避けるため常にlightで描画し、
  // マウント後にlocalStorage / prefers-color-schemeから実際のmodeを反映する。
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isPaletteMode(stored)) {
      setMode(stored);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleMode = () => {
    setMode((prevMode) => {
      const nextMode: PaletteMode = prevMode === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(STORAGE_KEY, nextMode);
      return nextMode;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
