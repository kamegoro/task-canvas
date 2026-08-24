'use client';

import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/_components/atoms/Button';
import Input from '@/_components/atoms/Input';
import { useSnackbar } from '@/_components/contexts/SnackbarContext';
import ThemeModeToggle from '@/_components/molecules/ThemeModeToggle';
import Title from '@/_components/molecules/Title';
import TodoCard from '@/_components/molecules/TodoCard';
import Box from '@/_components/mui/Box';
import Calender from '@/_components/mui/Calendar';
import Typography from '@/_components/mui/Typography';
import TaskProgress from '@/_components/organisms/TaskProgress';
import { useTodo } from '@/hooks/useTodo';

type TodoFormProps = {
  content: string;
};

const Top = () => {
  const { todos, progress, addTodo, updateTodo } = useTodo();
  const { showError } = useSnackbar();
  const { control, handleSubmit, reset } = useForm<TodoFormProps>({
    defaultValues: {
      content: '',
    },
  });

  const createTodo: SubmitHandler<TodoFormProps> = async (todoForm) => {
    try {
      await addTodo(todoForm.content);
      reset();
    } catch (error) {
      showError('タスクの追加に失敗しました');
      console.error(error);
    }
  };

  const handleChangeCheckbox = (
    id: string,
    content: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateTodo(id, content, event.target.checked);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        padding: { xs: '40px 20px 64px', sm: '64px 24px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px',
        }}
      >
        <Title href="/" />
        <ThemeModeToggle />
      </Box>
      <Box
        sx={{
          position: 'relative',
          marginBottom: '28px',
        }}
      >
        <Controller
          name="content"
          control={control}
          rules={{
            required: 'タスクを入力してください',
            validate: (value) => {
              return value.length <= 40 || '40文字以内で入力してください';
            },
          }}
          render={({ field, formState: { errors, isValid } }) => (
            <Box
              component="form"
              onSubmit={handleSubmit(createTodo)}
              aria-label="todo-form"
              sx={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}
            >
              <Box sx={{ flex: 1, position: 'relative' }}>
                <Input
                  {...field}
                  error={!!errors.content}
                  helperText={errors.content ? errors.content.message : ''}
                />
                <Calender
                  sx={{
                    position: 'absolute',
                    right: '4px',
                    bottom: '14px',
                    fontSize: 20,
                    color: 'text.secondary',
                    pointerEvents: 'none',
                  }}
                  name="calendar"
                />
              </Box>
              <Button
                type="submit"
                sx={{ flexShrink: 0, marginBottom: '4px' }}
                disabled={!isValid || !field.value}
              >
                Add
              </Button>
            </Box>
          )}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'divider',
          marginBottom: '24px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'text.secondary',
            whiteSpace: 'nowrap',
          }}
        >
          達成率
        </Typography>
        <TaskProgress
          allCount={progress.totalCount}
          currentCount={progress.completedCount}
        />
      </Box>
      <Box
        component="ul"
        role="list"
        aria-label="todo-list"
        sx={{ listStyle: 'none', margin: 0, padding: 0, marginTop: '12px' }}
      >
        {todos.map((todo) => {
          return (
            <Box
              component="li"
              role="listitem"
              aria-label="todo-item"
              key={todo.id}
            >
              <TodoCard
                text={todo.content}
                checked={todo.completed}
                onChange={(event) => {
                  handleChangeCheckbox(todo.id, todo.content, event);
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Top;
