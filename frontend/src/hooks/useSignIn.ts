import { useCallback } from 'react';

import { useDI } from '@/context/DIContext';
import { Email, Password } from '@/domain/credential';

interface UseSignInInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export const useSignIn = (): UseSignInInterface => {
  const { credentialFactory, signInUseCase } = useDI();

  const execute = useCallback(
    async (email: string, password: string): Promise<void> => {
      const credential = credentialFactory(new Email(email), new Password(password));
      await signInUseCase.execute(credential);
    },
    [credentialFactory, signInUseCase],
  );

  return { execute };
};
