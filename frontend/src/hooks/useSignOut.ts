import { useCallback } from 'react';

import { useDI } from '@/context/DIContext';

interface UseSignOutInterface {
  execute: () => void;
}

export const useSignOut = (): UseSignOutInterface => {
  const { signOutUseCase } = useDI();

  const execute = useCallback((): void => {
    signOutUseCase.execute();
  }, [signOutUseCase]);

  return { execute };
};
