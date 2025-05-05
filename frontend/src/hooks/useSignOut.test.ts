import { act, renderHook } from '@testing-library/react';

import { Email } from '@/domain/credential';
import { useSignOut } from '@/hooks/useSignOut';

const mockSignOutExecute = vi.fn();
const mockUserFactory = vi.fn();

vi.mock('@/context/DIContext', () => ({
  useDI: () => ({
    signOutUseCase: { execute: mockSignOutExecute },
    userFactory: mockUserFactory,
  }),
}));

beforeEach(() => {
  mockSignOutExecute.mockClear();
  mockUserFactory.mockClear();
});

describe('useSignOut', () => {
  it('サインアウトの成功', () => {
    const dummyUser = { dummy: true };
    mockUserFactory.mockReturnValue(dummyUser);

    const { result } = renderHook(() => useSignOut());

    act(() => {
      result.current.execute('test@example.com');
    });

    expect(mockUserFactory).toHaveBeenCalledTimes(1);
    const [emailArg] = mockUserFactory.mock.calls[0];
    expect(emailArg).toBeInstanceOf(Email);

    expect(mockSignOutExecute).toHaveBeenCalledTimes(1);
    expect(mockSignOutExecute).toHaveBeenCalledWith(dummyUser);
  });

  it('サインアウトの失敗', () => {
    const dummyUser = { dummy: true };
    mockUserFactory.mockReturnValue(dummyUser);

    const error = new Error('Failed to sign out');
    mockSignOutExecute.mockImplementation(() => {
      throw error;
    });

    const { result } = renderHook(() => useSignOut());

    expect(() => {
      act(() => {
        result.current.execute('test@example.com');
      });
    }).toThrow(error);

    expect(mockUserFactory).toHaveBeenCalledTimes(1);
    const [emailArg] = mockUserFactory.mock.calls[0];
    expect(emailArg).toBeInstanceOf(Email);

    expect(mockSignOutExecute).toHaveBeenCalledTimes(1);
    expect(mockSignOutExecute).toHaveBeenCalledWith(dummyUser);
  });
});
