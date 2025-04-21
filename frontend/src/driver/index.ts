type DriverTodo = {
  id: string;
  content: string;
  completed: boolean;
};

type DriverTodos = DriverTodo[];

export type CreateDriverRequest = {
  content: string;
  completed: boolean;
};

type CreateTodoResult = string;

export type UpdateDriverRequest = {
  id: string;
  content: string;
  completed: boolean;
};

export const getTodos = async (): Promise<DriverTodos> => {
  const response = await fetch('http://localhost:3000/api/v1/todos');
  const json = await response.json();

  return json;
};

export const createTodo = async ({
  content,
  completed,
}: CreateDriverRequest): Promise<CreateTodoResult> => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/todos', {
      method: 'POST',
      body: JSON.stringify({
        content: content,
        completed: completed,
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
};

export const updateTodoDriver = async ({
  id,
  content,
  completed,
}: UpdateDriverRequest): Promise<void> => {
  await fetch(`http://localhost:3000/api/v1/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      content: content,
      completed: completed,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signIn = async (email: string, password: string): Promise<void> => {
  const response = await fetch('http://localhost:3000/api/v1/signin', {
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
};

export const signUp = async (email: string, password: string): Promise<void> => {
  const response = await fetch('http://localhost:3000/api/v1/signup', {
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
};

export const signOut = async (): Promise<void> => {
  const response = await fetch('http://localhost:3000/api/v1/signout', {
    method: 'POST',
  });

  if (response.status !== 200) {
    throw new Error('Failed to sign out');
  }
};

interface ApiRouteDriverInterface {
  getTodos(): Promise<DriverTodos>;
  createTodo(request: CreateDriverRequest): Promise<CreateTodoResult>;
  updateTodo(request: UpdateDriverRequest): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

export class ApiRoutesDriver implements ApiRouteDriverInterface {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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
