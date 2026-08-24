import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import Box from '@/_components/mui/Box';
import Button from '@/_components/mui/Button';
import Typography from '@/_components/mui/Typography';

type CustomErrorBoxPropsType = {
  statusCode: '403' | '404' | '500';
  message: string;
  description: ReactNode;
};

const CustomErrorBox = ({ statusCode, message, description }: CustomErrorBoxPropsType) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 600,
          },
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          pb: {
            xs: 4,
            sm: 6,
          },
          boxShadow: '0px 0px 15px -5px #777777',
          borderRadius: '10px',
          px: 3,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: 100,
              sm: 160,
            },
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'center',
            transform: 'translate(0,18px)',
          }}
        >
          {statusCode.charAt(0)}
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              fontSize: {
                xs: 100,
                sm: 160,
              },
              fontWeight: 'bold',
            }}
          >
            {statusCode.charAt(1)}
          </Typography>
          {statusCode.charAt(2)}
        </Typography>
        <Typography
          sx={{
            marginBottom: 1,
            fontSize: {
              xs: 12,
              sm: 20,
            },
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: 10,
              sm: 14,
            },
            opacity: 0.4,
            color: 'text.primary',
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          {description}
        </Typography>
        <Button
          onClick={async () => {
            await router.push(`/`);
          }}
          variant="contained"
          sx={{
            width: {
              xs: '100%',
              sm: 260,
            },
            fontSize: {
              xs: 10,
              sm: 14,
            },
            margin: '0 auto',
            fontWeight: 'bold',
          }}
          size="large"
        >
          TOPページへ
        </Button>
      </Box>
    </Box>
  );
};

export default CustomErrorBox;
