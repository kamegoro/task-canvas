import { renderHook, act } from '@testing-library/react';

import { Email, Password } from '@/domain/credential';
import { useSignIn } from '@/hooks/useSignIn';

const mockSignInExecute = vi.fn();
const mockCredentialFactory = vi.fn();

vi.mock('@/context/DIContext', () => ({
  useDI: () => ({
    credentialFactory: mockCredentialFactory,
    signInUseCase: { execute: mockSignInExecute },
  }),
}));

beforeEach(() => {
  mockSignInExecute.mockClear();
  mockCredentialFactory.mockClear();
});

describe('useSignIn', () => {
  it('サインイン処理を実行する', async () => {
    const dummyCredential = { dummy: true };
    mockCredentialFactory.mockReturnValue(dummyCredential);

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.execute('test@example.com', 'testpassword');
    });

    expect(mockCredentialFactory).toHaveBeenCalledTimes(1);

    const [emailArg, passwordArg] = mockCredentialFactory.mock.calls[0];
    expect(emailArg).toBeInstanceOf(Email);
    expect(passwordArg).toBeInstanceOf(Password);

    expect(mockSignInExecute).toHaveBeenCalledTimes(1);
    expect(mockSignInExecute).toHaveBeenCalledWith(dummyCredential);
  });
});
