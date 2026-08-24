import type React from 'react';

import MuiInput, { type InputProps as MuiInputProps } from '@mui/material/Input';

export type InputProps = MuiInputProps;

const Input: React.FC<InputProps> = (props) => {
  return <MuiInput {...props} />;
};

export default Input;
