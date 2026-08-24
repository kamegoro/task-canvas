import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useSignOut } from '@/hooks/useSignOut';

const mockSignOutExecute = vi.fn();

vi.mock('@/context/DIContext', () => ({
  useDI: () => ({
    signOutUseCase: { execute: mockSignOutExecute },
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useSignOut', () => {
  it('サインアウトの成功', async () => {
    const { result } = renderHook(() => useSignOut(), { wrapper: createWrapper() });

    act(() => {
      result.current.execute();
    });

    await waitFor(() => expect(mockSignOutExecute).toHaveBeenCalledTimes(1));
  });
});
