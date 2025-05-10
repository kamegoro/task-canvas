import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

import { useSignIn } from '@/hooks/useSignIn';

const mockSignInExecute = vi.fn();

vi.mock('@/domain/credential', () => {
  const FakeEmail = vi.fn().mockImplementation((value: string) => ({ value }));
  const FakePassword = vi.fn().mockImplementation((value: string) => ({ value }));

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
    signInUseCase: { execute: mockSignInExecute },
  }),
}));

// eslint-disable-next-line import/order
import { Credential, Email, Password } from '@/domain/credential';

afterEach(() => {
  vi.clearAllMocks();
});

describe('useSignIn', () => {
  it('サインイン処理を実行する', async () => {
    const { result } = renderHook(() => useSignIn());

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

    expect(mockSignInExecute).toHaveBeenCalledTimes(1);
    expect(mockSignInExecute).toHaveBeenCalledWith(dummyCredential);
  });
});
