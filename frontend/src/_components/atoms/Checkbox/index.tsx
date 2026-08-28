import type React from 'react';

import { Check as CheckIcon } from '@mui/icons-material';

import Box from '@/_components/mui/Box';
import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from '../../mui/Checkbox';

export type CheckboxProps = Pick<MuiCheckboxProps, 'sx' | 'checked' | 'onChange'>;

const CHECKBOX_SIZE = 22;

const UncheckedIcon = (
  <Box
    sx={{
      width: CHECKBOX_SIZE,
      height: CHECKBOX_SIZE,
      boxSizing: 'border-box',
      borderRadius: '6px',
      border: '1.5px solid',
      borderColor: 'tokens.checkboxBorder',
    }}
  />
);

const CheckedIcon = (
  <Box
    sx={{
      width: CHECKBOX_SIZE,
      height: CHECKBOX_SIZE,
      boxSizing: 'border-box',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary.main',
    }}
  >
    <CheckIcon
      sx={{ fontSize: 16, color: 'primary.contrastText' }}
      aria-hidden
    />
  </Box>
);

const Checkbox: React.FC<CheckboxProps> = ({ sx, onChange, checked }) => {
  return (
    <MuiCheckbox
      icon={UncheckedIcon}
      checkedIcon={CheckedIcon}
      disableRipple
      onChange={onChange}
      checked={checked}
      sx={[
        {
          padding: '6px',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};

export default Checkbox;
