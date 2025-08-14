'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import MenuIcon from '@mui/icons-material/Menu';

import Box from '@/_components/mui/Box';
import IconButton from '@/_components/mui/IconButton';
import Menu from '@/_components/mui/Menu';
import MenuItem from '@/_components/mui/MenuItem';
import AppBar from '@/_components/mui/AppBar';
import { useSignOut } from '@/hooks/useSignOut';
import { useUser } from '@/hooks/useUser';

const AppHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { user } = useUser();
  const { execute } = useSignOut();

  if (!user.email) return null;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        backgroundColor: '#fafafa',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '4px 0',
        }}
      >
        <IconButton
          id="header-menu-button"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? 'header-menu' : undefined}
          onClick={handleClick}
          sx={{ marginRight: 1 }}
        >
          <MenuIcon
            aria-label="hamburger-menu"
            sx={{ color: 'black', height: 32, width: 32 }}
          />
        </IconButton>
        <Menu
          id="header-menu"
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
        >
          <MenuItem
            onClick={() => {
              execute();
              router.push('/signin');
              handleClose();
            }}
          >
            ログアウト
          </MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
};

export default AppHeader;
