import React from 'react';

import { CheckBox as CheckBoxIcon } from '@mui/icons-material';

import Box from '@/_components/mui/Box';
import Link, { LinkProps } from '@/_components/mui/Link';
import Typography from '@/_components/mui/Typography';

export type TitleProps = Pick<LinkProps, 'sx' | 'href'>;

const Title: React.FC<TitleProps> = ({ sx, href }) => {
  return (
    <Link
      href={href}
      sx={sx}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CheckBoxIcon
          sx={{
            color: 'brand.primary',
            fontSize: '60px',
            marginRight: '6px',
          }}
        />
        <Typography
          component={'h1'}
          sx={{
            fontSize: '44px',
            color: 'brand.primary',
            textDecoration: 'none',
          }}
        >
          My Todo-s
        </Typography>
      </Box>
    </Link>
  );
};

export default Title;
