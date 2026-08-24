import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDI } from '@/context/DIContext';
import { Credential, Email, Password } from '@/domain/credential';
import { userQueryKey } from '@/hooks/queryKeys';

interface UseSignInInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export const useSignIn = (): UseSignInInterface => {
  const { signInUseCase } = useDI();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const credential = Credential.factory(new Email(email), new Password(password));
      await signInUseCase.execute(credential);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userQueryKey }),
  });

  const execute = async (email: string, password: string): Promise<void> => {
    await mutateAsync({ email, password });
  };

  return { execute };
};
