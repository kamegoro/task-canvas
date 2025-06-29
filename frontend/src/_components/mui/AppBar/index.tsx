import { FC } from 'react';

import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material';

export type AppBarProps = MuiAppBarProps;

const AppBar: FC<AppBarProps> = (props) => {
  return <MuiAppBar {...props}>{props.children}</MuiAppBar>;
};

export default AppBar;
