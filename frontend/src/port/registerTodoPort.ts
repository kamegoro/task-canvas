import { TodoCompleted, TodoContent } from '@/domain/todo';

export interface RegisterTodoPort {
  register: (content: TodoContent, completed: TodoCompleted) => Promise<void>;
}
