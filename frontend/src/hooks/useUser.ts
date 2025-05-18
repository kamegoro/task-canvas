import { useCallback, useEffect, useState } from 'react';
import { useDI } from '@/context/DIContext';
import { usePathname } from 'next/navigation';

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
    if (pathname === '/signin' || pathname === '/signup') return;
    (async () => {
      await getUser();
    })();
  }, [getUser, pathname]);

  return {
    user,
  };
};