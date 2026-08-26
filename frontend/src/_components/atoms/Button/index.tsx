import type React from 'react';

import MuiButton, { type ButtonProps as MuiButtonProps } from '../../mui/Button';

export type ButtonProps = Pick<MuiButtonProps, 'children' | 'sx' | 'onClick' | 'disabled' | 'type'>;

const Button: React.FC<ButtonProps> = ({ children, sx, onClick, disabled, type }) => {
  return (
    <MuiButton
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      type={type}
      disableElevation
      sx={[
        {
          borderRadius: '999px',
          textTransform: 'none',
          fontWeight: 600,
          paddingX: '20px',
          paddingY: '8px',
          minWidth: 'auto',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'primary.dark',
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: 'tokens.track',
            color: 'tokens.textFaded',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
