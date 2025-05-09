import { createContext } from 'react';

import { useUser } from '@/hooks/useUser';

const UserContext = createContext({
  user: {
    email: '',
  },
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
