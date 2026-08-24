import type React from 'react';

import { Stack as MuiStack, type StackProps as MuiStackProps } from '@mui/material';

export type StackProps = MuiStackProps;

const Stack: React.FC<StackProps> = (props) => {
  return <MuiStack {...props} />;
};

export default Stack;
