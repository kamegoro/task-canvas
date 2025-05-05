import { Todos, Todo, TodoId, RegisterTodo } from '@/domain/todo';

export interface TodoPort {
  getTodos: () => Promise<Todos>;
  storeTodo: (registerTodo: RegisterTodo) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (todoId: TodoId) => Promise<void>;
}
