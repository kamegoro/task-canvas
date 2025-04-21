export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

class TodoId {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  getValue(): string {
    return this.value;
  }
}

class TodoContent {
  private readonly value: string;

  constructor(content: string) {
    this.value = content;
  }

  getValue(): string {
    return this.value;
  }
}
class TodoCompleted {
  private readonly value: boolean;

  constructor(completed: boolean) {
    this.value = completed;
  }

  getValue(): boolean {
    return this.value;
  }
}

class Todo2 {
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
