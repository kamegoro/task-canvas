import type React from 'react';

import MuiList, { type ListProps as MuiListProps } from '@mui/material/List';

export type ListProps = MuiListProps;

const List: React.FC<ListProps> = (props) => {
  return <MuiList {...props} />;
};

export default List;
