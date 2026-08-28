import type React from 'react';
import { useState } from 'react';

import Checkbox from '@/_components/atoms/Checkbox';
import Box from '@/_components/mui/Box';
import EditIcon from '@/_components/mui/EditIcon';
import IconButton from '@/_components/mui/IconButton';
import Typography from '@/_components/mui/Typography';

export type TodoCardProps = {
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onEditClick: () => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ checked, onChange, text, onEditClick }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const visibleEditIcon: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHover(true);
  };

  const hiddenEditIcon: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHover(false);
  };

  return (
    <Box
      onMouseOver={visibleEditIcon}
      onMouseLeave={hiddenEditIcon}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 0',
        borderBottom: '1px solid',
        borderColor: 'tokens.dividerFaint',
      }}
      aria-label="todo-card"
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            color: checked ? 'tokens.textFaded' : 'text.primary',
            textDecoration: checked ? 'line-through' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </Typography>
        {isHover && (
          <IconButton
            aria-label="todo-edit"
            onClick={onEditClick}
            size="small"
            sx={{ color: 'text.secondary', flexShrink: 0 }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TodoCard;
