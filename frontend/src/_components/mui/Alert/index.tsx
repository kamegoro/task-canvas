import type { FC } from 'react';

import MuiAlert, { type AlertProps } from '@mui/material/Alert';

export type AlertPropsType = AlertProps;

const Alert: FC<AlertProps> = (props) => <MuiAlert {...props}>{props.children}</MuiAlert>;

export default Alert;
