import type React from 'react';

import Box from '@/_components/mui/Box';
import Link, { type LinkProps } from '@/_components/mui/Link';
import Typography from '@/_components/mui/Typography';

export type TitleProps = Pick<LinkProps, 'sx' | 'href'>;

const Title: React.FC<TitleProps> = ({ sx, href }) => {
  return (
    <Link
      href={href}
      underline="none"
      sx={sx}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'text.secondary',
          }}
        >
          Task Manager
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '32px', sm: '40px' },
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'text.primary',
            margin: 0,
          }}
        >
          Task Canvas
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'text.secondary',
            margin: 0,
          }}
        >
          今日のタスクを整理しましょう
        </Typography>
      </Box>
    </Link>
  );
};

export default Title;
