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
  ) {}

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
  ) {}

  static factory(content: TodoContent, completed: TodoCompleted): RegisterTodo {
    return new RegisterTodo(content, completed);
  }

  getContent(): TodoContent {
    return this.content;
  }

  getCompleted(): TodoCompleted {
    return this.completed;
  }
}
