import { RegisterTodo, TodoCompleted, TodoContent } from '@/domain/todo';
import { StoreTodoUseCase } from '@/useCase/storeTodoUseCase';

describe('storeTodoUseCase', () => {
  it('Todoを保存する', async () => {
    class MockRegisterTodoPort {
      register = vi.fn().mockResolvedValueOnce(undefined);
    }
    const mockRegisterTodoPort = new MockRegisterTodoPort();

    const registerTodo = RegisterTodo.factory(
      new TodoContent('Content 1'),
      new TodoCompleted(false),
    );

    const sut = await new StoreTodoUseCase(mockRegisterTodoPort).execute(registerTodo);
    const expected = undefined;

    expect(sut).toEqual(expected);
    expect(mockRegisterTodoPort.register).toHaveBeenCalledTimes(1);
    expect(mockRegisterTodoPort.register).toHaveBeenCalledWith(
      registerTodo.getContent(),
      registerTodo.getCompleted(),
    );
  });
});
