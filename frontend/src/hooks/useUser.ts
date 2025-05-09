import { useCallback, useEffect, useState } from 'react';

import { useDI } from '@/context/DIContext';

type User = {
  email: string;
};

interface UseUserInterface {
  user: {
    email: string;
  };
}

export const useUser = (): UseUserInterface => {
  const { getUserUseCase } = useDI();
  const [user, setUser] = useState<User>({ email: '' });

  const getUser = useCallback(async () => {
    const res = await getUserUseCase.execute();

    setUser({
      email: res.getEmail().getValue(),
    });
  }, [getUserUseCase]);

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, [getUser]);

  return {
    user: user,
  };
};
