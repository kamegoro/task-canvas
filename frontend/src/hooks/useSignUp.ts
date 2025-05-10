import { useCallback } from 'react';

import { useDI } from '@/context/DIContext';
import { Credential, Email, Password } from '@/domain/credential';

interface UseSignUpInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export const useSignUp = (): UseSignUpInterface => {
  const { signUpUseCase } = useDI();

  const execute = useCallback(
    async (email: string, password: string): Promise<void> => {
      const credential = Credential.factory(new Email(email), new Password(password));
      await signUpUseCase.execute(credential);
    },
    [signUpUseCase],
  );

  return { execute };
};
