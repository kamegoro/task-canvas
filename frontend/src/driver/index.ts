type DriverUser = {
  email: string;
};

type DriverTodo = {
  id: string;
  content: string;
  completed: boolean;
};

type DriverTodos = DriverTodo[];

type CreateDriverRequest = {
  content: string;
  completed: boolean;
};

type CreateTodoResult = string;

export type UpdateDriverRequest = {
  id: string;
  content: string;
  completed: boolean;
};

interface ApiRouteDriverInterface {
  getUser(): Promise<DriverUser>;
  getTodos(): Promise<DriverTodos>;
  createTodo(request: CreateDriverRequest): Promise<CreateTodoResult>;
  updateTodo(request: UpdateDriverRequest): Promise<void>;
  deleteTodo(id: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

export class ApiRoutesDriver implements ApiRouteDriverInterface {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(): Promise<DriverUser> {
    const response = await fetch(`${this.baseUrl}/api/v1/users/me`);
    const json = await response.json();

    return json;
  }

  async getTodos(): Promise<DriverTodos> {
    const response = await fetch(`${this.baseUrl}/api/v1/todos`);
    const json = await response.json();

    return json;
  }

  async createTodo(request: CreateDriverRequest): Promise<CreateTodoResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/todos`, {
        method: 'POST',
        body: JSON.stringify({
          content: request.content,
          completed: request.completed,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 400) {
        throw new Error('Failed to create todo');
      }

      const json = await response.json();
      return json.id;
    } catch {
      throw new Error('Failed to create todo');
    }
  }

  async updateTodo(request: UpdateDriverRequest): Promise<void> {
    await fetch(`${this.baseUrl}/api/v1/todos/${request.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content: request.content,
        completed: request.completed,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteTodo(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/api/v1/todos/${id}`, {
      method: 'DELETE',
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/v1/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to sign in');
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/v1/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to sign up');
    }
  }

  async signOut(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/v1/signout`, {
      method: 'POST',
    });

    if (response.status !== 200) {
      throw new Error('Failed to sign out');
    }
  }
}
