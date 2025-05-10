import { useCallback } from 'react';

import { useDI } from '@/context/DIContext';
import { Credential, Email, Password } from '@/domain/credential';

interface UseSignInInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export const useSignIn = (): UseSignInInterface => {
  const { signInUseCase } = useDI();

  const execute = useCallback(
    async (email: string, password: string): Promise<void> => {
      const credential = Credential.factory(new Email(email), new Password(password));
      await signInUseCase.execute(credential);
    },
    [signInUseCase],
  );

  return { execute };
};
