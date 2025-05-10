import { act, renderHook } from '@testing-library/react';

import { useSignOut } from '@/hooks/useSignOut';

const mockSignOutExecute = vi.fn();

vi.mock('@/context/DIContext', () => ({
  useDI: () => ({
    signOutUseCase: { execute: mockSignOutExecute },
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useSignOut', () => {
  it('サインアウトの成功', () => {
    const { result } = renderHook(() => useSignOut());

    act(() => {
      result.current.execute();
    });

    expect(mockSignOutExecute).toHaveBeenCalledTimes(1);
  });
});
