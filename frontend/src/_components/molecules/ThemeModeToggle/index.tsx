'use client';

import type React from 'react';

import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import { useThemeMode } from '@/_components/contexts/ThemeModeContext';
import IconButton from '@/_components/mui/IconButton';

const ThemeModeToggle: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton
      aria-label={mode === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
      onClick={toggleMode}
      sx={{
        width: 36,
        height: 36,
        color: 'text.secondary',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {mode === 'light' ? (
        <DarkModeOutlined sx={{ fontSize: 18 }} />
      ) : (
        <LightModeOutlined sx={{ fontSize: 18 }} />
      )}
    </IconButton>
  );
};

export default ThemeModeToggle;
