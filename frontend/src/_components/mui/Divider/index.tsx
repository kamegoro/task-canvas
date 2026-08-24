import type React from 'react';

import { Divider as MuiDivider, type DividerProps as MuiDividerProps } from '@mui/material';

export type DividerProps = MuiDividerProps;

const Divider: React.FC<DividerProps> = (props) => {
  return <MuiDivider {...props} />;
};

export default Divider;
