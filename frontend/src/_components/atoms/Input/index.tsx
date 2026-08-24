'use client';

import type React from 'react';

import MuiTextField, { type TextFieldProps as MuiInputProps } from '../../mui/TextField';

export type InputProps = Pick<
  MuiInputProps,
  'onChange' | 'value' | 'error' | 'helperText' | 'name'
>;

const Input: React.FC<InputProps> = ({ onChange, value, error, helperText, name }) => {
  return (
    <MuiTextField
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Add new .."
      error={error}
      helperText={helperText}
      variant="standard"
      fullWidth
      slotProps={{
        input: {
          disableUnderline: false,
        },
      }}
      sx={{
        width: '100%',
        '& .MuiInput-root': {
          fontSize: '16px',
          paddingBottom: '10px',
          paddingRight: '32px',
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: 'divider',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled, .Mui-error):before': {
          borderBottomColor: 'text.secondary',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'primary.main',
        },
      }}
    />
  );
};

export default Input;
