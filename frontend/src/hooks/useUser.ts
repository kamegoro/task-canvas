import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { useDI } from '@/context/DIContext';
import { userQueryKey } from '@/hooks/queryKeys';

type User = {
  email: string;
};

interface UseUserInterface {
  user: {
    email: string;
  };
}

const EMPTY_USER: User = { email: '' };

export const useUser = (): UseUserInterface => {
  const { getUserUseCase } = useDI();
  const pathname = usePathname();
  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  const { data: user = EMPTY_USER } = useQuery({
    queryKey: userQueryKey,
    queryFn: async (): Promise<User> => {
      const res = await getUserUseCase.execute();
      return { email: res.getEmail().getValue() };
    },
    enabled: !isAuthPage,
  });

  return {
    user: isAuthPage ? EMPTY_USER : user,
  };
};
