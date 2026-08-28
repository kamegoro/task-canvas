import { TodoId } from '@/domain/todo';
import { DeleteTodoUseCase } from '@/useCase/deleteTodoUseCase';

describe('deleteTodoUseCase', () => {
  it('Todoを削除する', async () => {
    class MockTodoPort {
      getTodos = vi.fn();
      storeTodo = vi.fn();
      updateTodo = vi.fn();
      deleteTodo = vi.fn().mockResolvedValue(undefined);
    }
    const mockTodoPort = new MockTodoPort();

    const mockTodoId = new TodoId('1');

    const sut = await new DeleteTodoUseCase(mockTodoPort).execute(mockTodoId);
    const expected = undefined;

    expect(sut).toEqual(expected);
    expect(mockTodoPort.deleteTodo).toHaveBeenCalledTimes(1);
    expect(mockTodoPort.deleteTodo).toHaveBeenCalledWith(mockTodoId);
  });
});
