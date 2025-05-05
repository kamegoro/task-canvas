import { RegisterTodo } from '@/domain/todo';

interface StoreTodoUseCaseInterface {
  execute: (registerTodo: RegisterTodo) => Promise<void>;
}

export class StoreTodoUseCase implements StoreTodoUseCaseInterface {
  async execute(registerTodo: RegisterTodo): Promise<void> {
    await registerTodo.register();
  }
}
