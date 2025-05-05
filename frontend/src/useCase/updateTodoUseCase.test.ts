import { Todo, TodoCompleted, TodoContent, TodoId } from '@/domain/todo';
import { UpdateTodoUseCase } from '@/useCase/updateTodoUseCase';

describe('updateTodoUseCase', () => {
  it('Todoを更新する', async () => {
    class MockTodoPort {
      getTodos = vi.fn();
      storeTodo = vi.fn();
      updateTodo = vi.fn().mockResolvedValue(undefined);
      deleteTodo = vi.fn();
    }
    const mockTodoPort = new MockTodoPort();

    const mockTodo = new Todo(
      new TodoId('1'),
      new TodoContent('Content 1'),
      new TodoCompleted(false),
      mockTodoPort,
    );

    const sut = await new UpdateTodoUseCase(mockTodoPort).execute(mockTodo);
    const expected = undefined;

    expect(sut).toEqual(expected);
    expect(mockTodoPort.updateTodo).toHaveBeenCalledTimes(1);
    expect(mockTodoPort.updateTodo).toHaveBeenCalledWith(mockTodo);
  });
});
