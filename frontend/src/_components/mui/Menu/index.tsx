import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';

export type MenuProps = MuiMenuProps;

const Menu: React.FC<React.PropsWithChildren<MenuProps>> = (props) => {
  return <MuiMenu {...props} />;
};

export default Menu;
