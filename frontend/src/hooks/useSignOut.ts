import { useCallback } from 'react';

import { useDI } from '@/context/DIContext';
import { Email } from '@/domain/credential';

interface UseSignOutInterface {
  execute: (email: string) => void;
}

export const useSignOut = (): UseSignOutInterface => {
  const { signOutUseCase, userFactory } = useDI();

  const execute = useCallback(
    (email: string): void => {
      const user = userFactory(new Email(email));
      signOutUseCase.execute(user);
    },
    [signOutUseCase, userFactory],
  );

  return { execute };
};
