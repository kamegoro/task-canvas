import React from 'react';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export type ButtonProps = MuiButtonProps;

const Button: React.FC = (props: ButtonProps) => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};

export default Button;
