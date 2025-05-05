describe('storeTodoUseCase', () => {
  it('Todoを保存する', async () => {
    class MockRegisterTodo {
      getContent = vi.fn();
      getCompleted = vi.fn();
      register = vi.fn().mockResolvedValueOnce(undefined);
    }

    const mockRegisterTodo = new MockRegisterTodo();

    const sut = await mockRegisterTodo.register();

    expect(sut).toEqual(undefined);
    expect(mockRegisterTodo.register).toHaveBeenCalledTimes(1);
  });
});
