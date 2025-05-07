import { useState, useEffect, useCallback, useMemo } from 'react';

import { useDI } from '@/context/DIContext';
import { TodoCompleted, TodoContent, TodoId } from '@/domain/todo';

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
}

export const useTodo = (): UseTodoInterface => {
  const { registerTodoFactory, todoFactory, getTodosUseCase, storeTodoUseCase, updateTodoUseCase } =
    useDI();
  const [todos, setTodos] = useState<ViewTodo[]>([]);

  const progress = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalCount = todos.length;

    return {
      totalCount: totalCount,
      completedCount: completedCount,
    }
  }, [todos]);

  const getTodos = useCallback(async (): Promise<ViewTodo[]> => {
    const todos = await getTodosUseCase.execute();

    const viewTodos: ViewTodo[] = todos.value.map((todo) => {
      return {
        id: todo.getId(),
        content: todo.getContent(),
        completed: todo.getCompleted(),
      };
    });

    return viewTodos;
  }, [getTodosUseCase]);

  const addTodo = useCallback(
    async (content: string) => {
      const registerTodo = registerTodoFactory(new TodoContent(content), new TodoCompleted(false));
      await storeTodoUseCase.execute(registerTodo);

      const newTodos = await getTodos();
      setTodos(newTodos);
    },
    [registerTodoFactory, storeTodoUseCase, getTodos],
  );

  const updateTodo = useCallback(
    async (id: string, content: string, completed: boolean) => {
      const todo = todoFactory(
        new TodoId(id),
        new TodoContent(content),
        new TodoCompleted(completed),
      );
      await updateTodoUseCase.execute(todo);

      setTodos((prevTodos) => {
        return prevTodos.map((prevTodo) => {
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
    [todoFactory, updateTodoUseCase],
  );

  useEffect(() => {
    getTodos().then((result) => {
      setTodos(result);
    });
  }, [getTodos]);

  return { todos, progress, addTodo, updateTodo };
};
