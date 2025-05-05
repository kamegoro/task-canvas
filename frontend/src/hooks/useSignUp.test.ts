import { renderHook, act } from '@testing-library/react';

import { Email, Password } from '@/domain/credential';
import { useSignUp } from '@/hooks/useSignUp';

const mockSignUpExecute = vi.fn();
const mockCredentialFactory = vi.fn();

vi.mock('@/context/DIContext', () => ({
  useDI: () => ({
    credentialFactory: mockCredentialFactory,
    signUpUseCase: { execute: mockSignUpExecute },
  }),
}));

beforeEach(() => {
  mockSignUpExecute.mockClear();
  mockCredentialFactory.mockClear();
});

describe('useSignUp', () => {
  it('新しいユーザーを登録する', async () => {
    const dummyCredential = { dummy: true };
    mockCredentialFactory.mockReturnValue(dummyCredential);

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.execute('test@example.com', 'testpassword');
    });

    expect(mockCredentialFactory).toHaveBeenCalledTimes(1);
    const [emailArg, passwordArg] = mockCredentialFactory.mock.calls[0];
    expect(emailArg).toBeInstanceOf(Email);
    expect(passwordArg).toBeInstanceOf(Password);

    expect(mockSignUpExecute).toHaveBeenCalledTimes(1);
    expect(mockSignUpExecute).toHaveBeenCalledWith(dummyCredential);
  });
});
