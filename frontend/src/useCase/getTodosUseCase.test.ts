import { TodoCompleted, TodoContent, TodoId } from '@/domain/todo';

import { GetTodosUseCase } from './getTodosUseCase';

describe('getTodoUseCase', () => {
  it('Todoを取得する', async () => {
    class MockTodo {
      getId = vi.fn().mockReturnValue(new TodoId('1'));
      getContent = vi.fn().mockReturnValue(new TodoContent('Content 1'));
      getCompleted = vi.fn().mockReturnValue(new TodoCompleted(false));
    }

    class MockTodos {
      value = [new MockTodo()];
    }

    const mockTodos = new MockTodos();

    class MockTodoPort {
      getTodos = vi.fn().mockResolvedValue(mockTodos);
      storeTodo = vi.fn();
      updateTodo = vi.fn();
      deleteTodo = vi.fn();
    }

    const mockTodoPort = new MockTodoPort();

    const sut = await new GetTodosUseCase(mockTodoPort).execute();

    expect(sut).toEqual(mockTodos);
    expect(mockTodoPort.getTodos).toHaveBeenCalledTimes(1);
  });
});
