'use client';

import React from 'react';

import MuiTextField, { TextFieldProps as MuiInputProps } from '../../mui/TextField';

export type InputProps = Pick<MuiInputProps, 'onChange'>;

const Input: React.FC<InputProps> = ({ onChange }) => {
  return (
    <MuiTextField
      onChange={onChange}
      placeholder="Add new .."
      sx={{
        boxShadow: 1,
        paddingLeft: 3,
        paddingRight: 6,
        borderRadius: 0.5,
        boxSizing: 'border-box',
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
          borderStyle: 'none',
        },
      }}
    />
  );
};

export default Input;
