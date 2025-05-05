import { Todo } from '@/domain/todo';
import { TodoPort } from '@/port/todoPort';

interface UpdateTodoUseCaseInterface {
  execute: (todo: Todo) => Promise<void>;
}

export class UpdateTodoUseCase implements UpdateTodoUseCaseInterface {
  private readonly todoPort: TodoPort;

  constructor(todoPort: TodoPort) {
    this.todoPort = todoPort;
  }

  async execute(todo: Todo): Promise<void> {
    await this.todoPort.updateTodo(todo);
  }
}
