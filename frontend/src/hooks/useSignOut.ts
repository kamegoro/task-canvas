import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDI } from '@/context/DIContext';
import { userQueryKey } from '@/hooks/queryKeys';

interface UseSignOutInterface {
  execute: () => void;
}

export const useSignOut = (): UseSignOutInterface => {
  const { signOutUseCase } = useDI();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      signOutUseCase.execute();
    },
    onSuccess: () => queryClient.removeQueries({ queryKey: userQueryKey }),
  });

  const execute = (): void => {
    mutate();
  };

  return { execute };
};
