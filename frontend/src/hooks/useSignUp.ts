import { useMutation } from '@tanstack/react-query';

import { useDI } from '@/context/DIContext';
import { Credential, Email, Password } from '@/domain/credential';

interface UseSignUpInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export const useSignUp = (): UseSignUpInterface => {
  const { signUpUseCase } = useDI();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const credential = Credential.factory(new Email(email), new Password(password));
      await signUpUseCase.execute(credential);
    },
    onError: (error) => {
      console.error('useSignUp: エラー発生:', error);
    },
  });

  const execute = async (email: string, password: string): Promise<void> => {
    await mutateAsync({ email, password });
  };

  return { execute };
};
