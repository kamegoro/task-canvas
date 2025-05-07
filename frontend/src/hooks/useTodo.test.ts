import { renderHook, act, waitFor } from '@testing-library/react';

import { useTodo } from '@/hooks/useTodo';

const mockRegisterTodoFactory = vi.fn();
const mockTodoFactory = vi.fn();
const mockGetTodosExecute = vi.fn();
const mockStoreTodoExecute = vi.fn();
const mockUpdateTodoExecute = vi.fn();

const diMock = {
  registerTodoFactory: mockRegisterTodoFactory,
  todoFactory: mockTodoFactory,
  getTodosUseCase: { execute: mockGetTodosExecute },
  storeTodoUseCase: { execute: mockStoreTodoExecute },
  updateTodoUseCase: { execute: mockUpdateTodoExecute },
};

vi.mock('@/context/DIContext', () => ({
  useDI: () => diMock,
}));

beforeEach(() => {
  mockRegisterTodoFactory.mockClear();
  mockTodoFactory.mockClear();
  mockGetTodosExecute.mockClear();
  mockStoreTodoExecute.mockClear();
  mockUpdateTodoExecute.mockClear();
});

describe('useTodo', () => {
  it('マウント時にTodoを取得する', async () => {
    const mockTodo = {
      getId: () => '1',
      getContent: () => 'Todo 1',
      getCompleted: () => false,
    };

    const mockTodosResponse = { value: [mockTodo] };
    mockGetTodosExecute.mockResolvedValue(mockTodosResponse);

    const expected = [
      {
        id: '1',
        content: 'Todo 1',
        completed: false,
      },
    ];

    const { result } = renderHook(() => useTodo());

    await waitFor(() => expect(result.current.todos).toEqual(expected));

    expect(mockGetTodosExecute).toHaveBeenCalledTimes(1);
  });

  it('新しいTodoを追加するとstateに反映される', async () => {
    class MockInitialTodo {
      getId = vi.fn().mockReturnValue('1');
      getContent = vi.fn().mockReturnValue('Todo 1');
      getCompleted = vi.fn().mockReturnValue(false);
    }
    const initialTodosResponse = { value: [new MockInitialTodo()] };
    mockGetTodosExecute.mockResolvedValueOnce(initialTodosResponse);

    const { result } = renderHook(() => useTodo());

    await waitFor(() => {
      expect(result.current.todos).toStrictEqual([
        {
          id: '1',
          content: 'Todo 1',
          completed: false,
        },
      ]);
    });

    class MockRegisterTodoFactory {
      getContent = vi.fn().mockReturnValue('Todo 2');
      getCompleted = vi.fn().mockReturnValue(false);
    }

    const mockRegisterTodo = new MockRegisterTodoFactory();
    mockRegisterTodoFactory.mockReturnValueOnce(mockRegisterTodo);

    mockStoreTodoExecute.mockResolvedValueOnce(undefined);
    class MockNewTodo {
      getId = vi.fn().mockReturnValue('2');
      getContent = vi.fn().mockReturnValue('Todo 2');
      getCompleted = vi.fn().mockReturnValue(false);
    }

    const updatedTodosResponse = { value: [new MockInitialTodo(), new MockNewTodo()] };
    mockGetTodosExecute.mockResolvedValue(updatedTodosResponse);

    await act(async () => {
      await result.current.addTodo('Todo 2');
    });

    await waitFor(() => {
      expect(result.current.todos).toStrictEqual([
        {
          id: '1',
          content: 'Todo 1',
          completed: false,
        },
        {
          id: '2',
          content: 'Todo 2',
          completed: false,
        },
      ]);
    });

    expect(mockStoreTodoExecute).toHaveBeenCalledTimes(1);
    expect(mockStoreTodoExecute).toHaveBeenCalledWith(mockRegisterTodo);
    expect(mockGetTodosExecute).toHaveBeenCalledTimes(2);
  });

  it('既存のTodoを更新する', async () => {
    class MockInitialTodo {
      getId = vi.fn().mockReturnValue('1');
      getContent = vi.fn().mockReturnValue('Todo 1');
      getCompleted = vi.fn().mockReturnValue(false);
    }
    const initialTodosResponse = { value: [new MockInitialTodo()] };
    mockGetTodosExecute.mockResolvedValueOnce(initialTodosResponse);

    const { result } = renderHook(() => useTodo());

    await waitFor(() => {
      expect(result.current.todos).toStrictEqual([
        {
          id: '1',
          content: 'Todo 1',
          completed: false,
        },
      ]);
    });

    class MockUpdatedTodo {
      getId = vi.fn().mockReturnValue('1');
      getContent = vi.fn().mockReturnValue('Updated Todo 1');
      getCompleted = vi.fn().mockReturnValue(true);
    }
    const mockUpdatedTodo = new MockUpdatedTodo();
    mockTodoFactory.mockReturnValueOnce(mockUpdatedTodo);

    mockTodoFactory.mockReturnValueOnce(mockUpdatedTodo);
    mockUpdateTodoExecute.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.updateTodo('1', 'Updated Todo 1', true);
    });

    await waitFor(() => {
      expect(result.current.todos).toStrictEqual([
        {
          id: '1',
          content: 'Updated Todo 1',
          completed: true,
        },
      ]);
    });
  });

  it('Todoの進捗率を取得する', async () => {
    class MockInitialTodo1 {
      getId = vi.fn().mockReturnValue('1');
      getContent = vi.fn().mockReturnValue('Todo 1');
      getCompleted = vi.fn().mockReturnValue(false);
    }

    class MockInitialTodo2 {
      getId = vi.fn().mockReturnValue('2');
      getContent = vi.fn().mockReturnValue('Todo 2');
      getCompleted = vi.fn().mockReturnValue(true);
    }

    const initialTodosResponse = { value: [new MockInitialTodo1(), new MockInitialTodo2()] };
    mockGetTodosExecute.mockResolvedValueOnce(initialTodosResponse);
    const { result } = renderHook(() => useTodo());

    await waitFor(() => {
      expect(result.current.progress).toStrictEqual({
        totalCount: 2,
        completedCount: 1,
      })
    })
  })
});
