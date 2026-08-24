import type { TodoCompleted, TodoContent } from '@/domain/todo';
import type { ApiRoutesDriver } from '@/driver';
import type { RegisterTodoPort } from '@/port/registerTodoPort';

export class RegisterTodoGateway implements RegisterTodoPort {
  private readonly apiRoutesDriver: ApiRoutesDriver;

  constructor(apiRoutesDriver: ApiRoutesDriver) {
    this.apiRoutesDriver = apiRoutesDriver;
  }

  async register(content: TodoContent, completed: TodoCompleted): Promise<void> {
    await this.apiRoutesDriver.createTodo({
      content: content.getValue(),
      completed: completed.getValue(),
    });
  }
}
