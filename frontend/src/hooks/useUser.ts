import { useCallback, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  const getUser = useCallback(async () => {
    const res = await getUserUseCase.execute();
    setUser({
      email: res.getEmail().getValue(),
    });
  }, [getUserUseCase]);

  useEffect(() => {
    if (pathname === '/signin' || pathname === '/signup') {
      setUser({ email: '' });
      return;
    }
    (async () => {
      await getUser();
    })();
  }, [getUser, pathname]);

  return {
    user,
  };
};
