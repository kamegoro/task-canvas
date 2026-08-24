import type { FC } from 'react';

import Box from '@/_components/mui/Box';
import Typography from '@/_components/mui/Typography';

type TaskProgressProps = {
  allCount: number;
  currentCount: number;
};

const TaskProgress: FC<TaskProgressProps> = ({ allCount, currentCount }) => {
  const percentage = allCount > 0 ? Math.min(100, (currentCount / allCount) * 100) : 0;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
      }}
    >
      <Box
        role="progressbar"
        aria-label="達成率"
        aria-valuenow={currentCount}
        aria-valuemin={0}
        aria-valuemax={allCount}
        sx={{
          flex: 1,
          height: '6px',
          borderRadius: '999px',
          backgroundColor: 'tokens.track',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${percentage}%`,
            borderRadius: '999px',
            backgroundColor: 'primary.main',
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'text.secondary',
          whiteSpace: 'nowrap',
        }}
      >
        {currentCount} / {allCount}
      </Typography>
    </Box>
  );
};

export default TaskProgress;
