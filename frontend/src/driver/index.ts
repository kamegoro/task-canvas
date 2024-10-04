type DriverTodo = {
  id: string;
  content: string;
  completed: boolean;
};

type DriverTodos = {
  todos: DriverTodo[];
};

export type CreateDriverRequest = {
  content: string;
  completed: boolean;
};

type CreateTodoResult = string;

export const getTodos = async (): Promise<DriverTodos> => {
  const response = await fetch('http://localhost:3000/api/v1/todos');
  const json = await response.json();

  return json;
};

export const createTodo = async ({
  content,
  completed,
}: CreateDriverRequest): Promise<CreateTodoResult> => {
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

  const json = await response.json();
  return json.id;
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
}

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
  })

  if (response.status !== 200) {
    throw new Error('Failed to sign up');
  }
}
