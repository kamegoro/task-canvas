import { useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useDI } from '@/context/DIContext';
import { RegisterTodo, Todo, TodoCompleted, TodoContent, TodoId } from '@/domain/todo';
import { todosQueryKey } from '@/hooks/queryKeys';

type ViewTodo = {
  id: string;
  content: string;
  completed: boolean;
};

interface UseTodoInterface {
  todos: ViewTodo[];
  progress: {
    totalCount: number;
    completedCount: number;
  };
  addTodo: (content: string) => Promise<void>;
  updateTodo: (id: string, content: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodo = (): UseTodoInterface => {
  const { getTodosUseCase, storeTodoUseCase, updateTodoUseCase, deleteTodoUseCase } = useDI();
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery({
    queryKey: todosQueryKey,
    queryFn: async (): Promise<ViewTodo[]> => {
      const todos = await getTodosUseCase.execute();

      return todos.value.map((todo) => {
        return {
          id: todo.getId(),
          content: todo.getContent(),
          completed: todo.getCompleted(),
        };
      });
    },
  });

  const progress = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalCount = todos.length;

    return {
      totalCount: totalCount,
      completedCount: completedCount,
    };
  }, [todos]);

  const addTodoMutation = useMutation({
    mutationFn: async (content: string) => {
      const registerTodo = RegisterTodo.factory(new TodoContent(content), new TodoCompleted(false));
      await storeTodoUseCase.execute(registerTodo);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todosQueryKey }),
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({
      id,
      content,
      completed,
    }: {
      id: string;
      content: string;
      completed: boolean;
    }) => {
      const todo = Todo.factory(
        new TodoId(id),
        new TodoContent(content),
        new TodoCompleted(completed),
      );
      await updateTodoUseCase.execute(todo);
    },
    onSuccess: (_data, { id, content, completed }) => {
      queryClient.setQueryData<ViewTodo[]>(todosQueryKey, (prevTodos) => {
        return (prevTodos ?? []).map((prevTodo) => {
          if (prevTodo.id === id) {
            return {
              ...prevTodo,
              content: content,
              completed: completed,
            };
          }
          return prevTodo;
        });
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteTodoUseCase.execute(new TodoId(id));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todosQueryKey }),
  });

  const addTodo = async (content: string): Promise<void> => {
    await addTodoMutation.mutateAsync(content);
  };

  const updateTodo = async (id: string, content: string, completed: boolean): Promise<void> => {
    await updateTodoMutation.mutateAsync({ id, content, completed });
  };

  const deleteTodo = async (id: string): Promise<void> => {
    await deleteTodoMutation.mutateAsync(id);
  };

  return { todos, progress, addTodo, updateTodo, deleteTodo };
};
