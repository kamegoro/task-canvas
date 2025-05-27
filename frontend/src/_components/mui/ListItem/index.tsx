import React from 'react';

import MuiListItem, { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';

export type ListItemProps = MuiListItemProps;

const ListItem: React.FC<ListItemProps> = (props) => {
  return <MuiListItem {...props} />;
};

export default ListItem;
