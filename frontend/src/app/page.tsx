'use client';

import { useRouter } from 'next/navigation';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/_components/atoms/Button';
import Input from '@/_components/atoms/Input';
import { useSnackbar } from '@/_components/contexts/SnackbarContext';
import Title from '@/_components/molecules/Title';
import TodoCard from '@/_components/molecules/TodoCard';
import Box from '@/_components/mui/Box';
import Calender from '@/_components/mui/Calendar';
import Container from '@/_components/mui/Container';
import Stack from '@/_components/mui/Stack';
import TaskProgress from '@/_components/organisms/TaskProgress';
import { useSignOut } from '@/hooks/useSignOut';
import { useTodo } from '@/hooks/useTodo';

type TodoFormProps = {
  content: string;
};

const Top = () => {
  const router = useRouter();
  const { execute } = useSignOut();
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
        backgroundColor: '#FFF',
        height: '100vh',
        width: '100vw',
        paddingTop: '60px',
      }}
    >
      <Button
        onClick={() => {
          execute();
          router.push('/signin');
        }}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        ログアウト
      </Button>
      <Container maxWidth={'lg'}>
        <Box
          sx={{
            width: '100%',
            minHeight: 500,
            backgroundColor: '#F8F9FA',
            boxShadow: 7,
            borderRadius: 1,
            padding: 10,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 4,
            }}
          >
            <Title href="/" />
          </Box>
          <Box
            sx={{
              position: 'relative',
              marginBottom: 3,
            }}
          >
            <Stack
              component={'form'}
              onSubmit={handleSubmit(createTodo)}
              aria-label="todo-form"
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
                  <>
                    <Input
                      {...field}
                      error={errors.content ? true : false}
                      helperText={errors.content ? errors.content.message : ''}
                    />
                    <Calender
                      sx={{
                        position: 'absolute',
                        top: '15px',
                        right: '90px',
                      }}
                      name="calendar"
                    />
                    <Button
                      type="submit"
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '20px',
                      }}
                      disabled={!isValid || !field.value}
                    >
                      Add
                    </Button>
                  </>
                )}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: 1,
              borderBottom: 1,
              opacity: 0.1,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              marginLeft: 1,
              fontSize: 14,
              color: '#6c757d',
            }}
          >
            <Box sx={{ marginRight: 2 }}>達成率</Box>
            <TaskProgress
              allCount={progress.totalCount}
              currentCount={progress.completedCount}
            />
          </Box>
          <Box sx={{ marginTop: 3 }}>
            {todos.map((todo, i) => {
              return (
                <TodoCard
                  text={todo.content}
                  checked={todo.completed}
                  onChange={(event) => {
                    handleChangeCheckbox(todo.id, todo.content, event);
                  }}
                  key={i}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Top;
