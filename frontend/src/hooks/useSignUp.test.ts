import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { useSignUp } from '@/hooks/useSignUp';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

const mockSignUpExecute = vi.fn();

vi.mock('@/domain/credential', () => {
  // biome-ignore lint/complexity/useArrowFunction: must stay a constructor function so `new Email(...)` works
  const FakeEmail = vi.fn().mockImplementation(function (value: string) {
    return { value };
  });
  // biome-ignore lint/complexity/useArrowFunction: must stay a constructor function so `new Password(...)` works
  const FakePassword = vi.fn().mockImplementation(function (value: string) {
    return { value };
  });

  class FakeCredential {
    constructor(
      public email: typeof FakeEmail,
      public password: typeof FakePassword,
    ) {}

    static factory(email: typeof FakeEmail, password: typeof FakePassword) {
      return new FakeCredential(email, password);
    }

    getEmail() {
      return this.email;
    }

    getPassword() {
      return this.password;
    }
  }

  FakeCredential.factory = vi
    .fn()
    .mockImplementation((email, password) => new FakeCredential(email, password));

  return {
    Email: FakeEmail,
    Password: FakePassword,
    Credential: FakeCredential,
  };
});

vi.mock('@/context/DIContext', () => ({
  useDI: () => ({
    signUpUseCase: { execute: mockSignUpExecute },
  }),
}));

import { Credential, Email, Password } from '@/domain/credential';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useSignUp', () => {
  it('新しいユーザーを登録する', async () => {
    const { result } = renderHook(() => useSignUp(), { wrapper: createWrapper() });

    const dummyCredential = new Credential(
      new Email('test@example.com'),
      new Password('testpassword'),
    );
    vi.mocked(Credential.factory).mockReturnValue(dummyCredential);

    await act(async () => {
      await result.current.execute('test@example.com', 'testpassword');
    });

    expect(Email).toHaveBeenCalledWith('test@example.com');
    expect(Password).toHaveBeenCalledWith('testpassword');

    expect(Credential.factory).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'test@example.com' }),
      expect.objectContaining({ value: 'testpassword' }),
    );

    expect(mockSignUpExecute).toHaveBeenCalledTimes(1);
    expect(mockSignUpExecute).toHaveBeenCalledWith(dummyCredential);
  });
});
