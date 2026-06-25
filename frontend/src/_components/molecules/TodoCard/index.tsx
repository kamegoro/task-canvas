import React from 'react';

import Checkbox from '@/_components/atoms/Checkbox';
import Box from '@/_components/mui/Box';
import EditIcon from '@/_components/mui/EditIcon';
import IconButton from '@/_components/mui/IconButton';
import Typography from '@/_components/mui/Typography';

export type TodoCardProps = {
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ checked, onChange, text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 1,
        transition: 'background-color 0.15s',
        '&:hover': {
          bgcolor: 'grey.100',
        },
      }}
      aria-label="todo-card"
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        sx={{
          '.MuiSvgIcon-root': {
            fontSize: 32,
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          py: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            marginLeft: '12px',
            opacity: checked ? 0.5 : 1,
            textDecoration: checked ? 'line-through' : 'none',
            transition: 'opacity 0.2s, text-decoration 0.2s',
            color: 'gray.text',
          }}
        >
          {text}
        </Typography>
        <IconButton
          aria-label="todo-edit"
          sx={{
            marginRight: '8px',
            color: 'icon.blue',
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TodoCard;
