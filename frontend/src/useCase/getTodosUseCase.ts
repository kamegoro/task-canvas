import { Todos } from '@/domain/todo';
import { TodoPort } from '@/port/todoPort';

interface GetTodosUseCaseInterface {
  execute: () => Promise<Todos>;
}

export class GetTodosUseCase implements GetTodosUseCaseInterface {
  private readonly todoPort: TodoPort;

  constructor(todoPort: TodoPort) {
    this.todoPort = todoPort;
  }

  async execute(): Promise<Todos> {
    return await this.todoPort.getTodos();
  }
}
