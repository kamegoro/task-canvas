import { RegisterTodo } from '@/domain/todo';
import { RegisterTodoPort } from '@/port/registerTodoPort';

interface StoreTodoUseCaseInterface {
  execute: (registerTodo: RegisterTodo) => Promise<void>;
}

export class StoreTodoUseCase implements StoreTodoUseCaseInterface {
  private readonly registerTodoPort: RegisterTodoPort;

  constructor(registerTodoPort: RegisterTodoPort) {
    this.registerTodoPort = registerTodoPort;
  }

  async execute(registerTodo: RegisterTodo): Promise<void> {
    await this.registerTodoPort.register(registerTodo.getContent(), registerTodo.getCompleted());
  }
}
