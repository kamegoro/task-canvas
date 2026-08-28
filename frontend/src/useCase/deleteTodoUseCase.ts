import type { TodoId } from '@/domain/todo';
import type { TodoPort } from '@/port/todoPort';

interface DeleteTodoUseCaseInterface {
  execute: (todoId: TodoId) => Promise<void>;
}

export class DeleteTodoUseCase implements DeleteTodoUseCaseInterface {
  private readonly todoPort: TodoPort;

  constructor(todoPort: TodoPort) {
    this.todoPort = todoPort;
  }

  async execute(todoId: TodoId): Promise<void> {
    await this.todoPort.deleteTodo(todoId);
  }
}
