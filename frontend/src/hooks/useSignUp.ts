import { useCallback } from 'react';

import { useDI } from '@/context/DIContext';
import { Email, Password } from '@/domain/credential';

interface UseSignUpInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export const useSignUp = (): UseSignUpInterface => {
  const { credentialFactory, signUpUseCase } = useDI();

  const execute = useCallback(
    async (email: string, password: string): Promise<void> => {
      const credential = credentialFactory(new Email(email), new Password(password));
      await signUpUseCase.execute(credential);
    },
    [credentialFactory, signUpUseCase],
  );

  return { execute };
};
