import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import MenuIcon from '@mui/icons-material/Menu';

import IconButton from '@/_components/mui/IconButton';
import Menu from '@/_components/mui/Menu';
import MenuItem from '@/_components/mui/MenuItem';
import { useSignOut } from '@/hooks/useSignOut';
import Box from '@/_components/mui/Box';

const AppHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { execute } = useSignOut();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <IconButton
        id="header-menu-button"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'header-menu' : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{ color: 'black' }} />
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
      {children}
    </Box>
  );
};

export default AppHeader;
