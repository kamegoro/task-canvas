import { TodoPort } from '@/port/todoPort';

export class TodoId {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  getValue(): string {
    return this.value;
  }
}

export class TodoContent {
  private readonly value: string;

  constructor(content: string) {
    this.value = content;
  }

  getValue(): string {
    return this.value;
  }
}
export class TodoCompleted {
  private readonly value: boolean;

  constructor(completed: boolean) {
    this.value = completed;
  }

  getValue(): boolean {
    return this.value;
  }
}

export class Todo {
  constructor(
    private id: TodoId,
    private content: TodoContent,
    private completed: TodoCompleted,
    private todoPort: TodoPort,
  ) {}

  static factory(
    todoPort: TodoPort,
  ): (todoId: TodoId, todoContent: TodoContent, todoCompleted: TodoCompleted) => Todo {
    return (todoId: TodoId, todoContent: TodoContent, todoCompleted: TodoCompleted) => {
      return new Todo(todoId, todoContent, todoCompleted, todoPort);
    };
  }

  getId(): string {
    return this.id.getValue();
  }

  getContent(): string {
    return this.content.getValue();
  }

  getCompleted(): boolean {
    return this.completed.getValue();
  }
}

export class Todos {
  value: Todo[];

  constructor(todos: Todo[]) {
    this.value = todos;
  }
}

export class RegisterTodo {
  constructor(
    private readonly content: TodoContent,
    private readonly completed: TodoCompleted,
    private readonly todoPort: TodoPort,
  ) {}

  static factory(
    todoPort: TodoPort,
  ): (content: TodoContent, completed: TodoCompleted) => RegisterTodo {
    return (content: TodoContent, completed: TodoCompleted) => {
      return new RegisterTodo(content, completed, todoPort);
    };
  }

  getContent(): string {
    return this.content.getValue();
  }

  getCompleted(): boolean {
    return this.completed.getValue();
  }

  async register(): Promise<void> {
    this.todoPort.storeTodo(this);
  }
}
