import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

export type MenuItemProps = MuiMenuItemProps;

const MenuItem: React.FC<React.PropsWithChildren<MenuItemProps>> = (props) => {
  return <MuiMenuItem {...props} />;
};

export default MenuItem;
