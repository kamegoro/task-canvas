import { Todos, Todo, TodoCompleted, TodoContent, TodoId, RegisterTodo } from '@/domain/todo';
import { ApiRoutesDriver } from '@/driver';
import { TodoPort } from '@/port/todoPort';

export default class TodoGateway implements TodoPort {
  private readonly apiRoutesDriver: ApiRoutesDriver;

  constructor(apiRoutesDriver: ApiRoutesDriver) {
    this.apiRoutesDriver = apiRoutesDriver;
  }

  async getTodos(): Promise<Todos> {
    const driverTodos = await this.apiRoutesDriver.getTodos();

    const todos: Todo[] = driverTodos.map((driverTodo) => {
      return new Todo(
        new TodoId(driverTodo.id),
        new TodoContent(driverTodo.content),
        new TodoCompleted(driverTodo.completed),
        this,
      );
    });

    return new Todos(todos);
  }

  async storeTodo(registerTodo: RegisterTodo): Promise<void> {
    await this.apiRoutesDriver.createTodo({
      content: registerTodo.getContent(),
      completed: registerTodo.getCompleted(),
    });
  }

  async updateTodo(todo: Todo): Promise<void> {
    await this.apiRoutesDriver.updateTodo({
      id: todo.getId(),
      content: todo.getContent(),
      completed: todo.getCompleted(),
    });
  }

  async deleteTodo(todoId: TodoId): Promise<void> {
    await this.apiRoutesDriver.deleteTodo(todoId.getValue());
  }
}
