import { createContext, useContext, useMemo } from 'react';

import { ApiRoutesDriver } from '@/driver';
import { CredentialGateway } from '@/gateway/credential';
import { RegisterTodoGateway } from '@/gateway/registerTodoGateway';
import { SignOutGateway } from '@/gateway/signOutGateway';
import TodoGateway from '@/gateway/todo';
import { UserGateway } from '@/gateway/userGateway';
import { GetTodosUseCase } from '@/useCase/getTodosUseCase';
import { GetUserUseCase } from '@/useCase/getUserUseCase';
import { SignInUseCase } from '@/useCase/signInUseCase';
import { SignOutUseCase } from '@/useCase/signOutUseCase';
import { SignUpUseCase } from '@/useCase/signUpUseCase';
import { StoreTodoUseCase } from '@/useCase/storeTodoUseCase';
import { UpdateTodoUseCase } from '@/useCase/updateTodoUseCase';

type DIContainer = {
  signInUseCase: SignInUseCase;
  signUpUseCase: SignUpUseCase;
  signOutUseCase: SignOutUseCase;
  getTodosUseCase: GetTodosUseCase;
  storeTodoUseCase: StoreTodoUseCase;
  updateTodoUseCase: UpdateTodoUseCase;
  getUserUseCase: GetUserUseCase;
};

const DIContext = createContext<DIContainer | null>(null);

export const useDI = (): DIContainer => {
  const context = useContext(DIContext);
  if (!context) {
    throw new Error('useDI must be used within a DiProvider');
  }
  return context;
};

const DiProvider = ({ children }: { children: React.ReactNode }) => {
  const diContainer = useMemo<DIContainer>(() => {
    const apiRouteDriver = new ApiRoutesDriver('http://localhost:3000');

    const credentialGateway = new CredentialGateway(apiRouteDriver);
    const todoGateway = new TodoGateway(apiRouteDriver);
    const userGateway = new UserGateway(apiRouteDriver);
    const signOutGateway = new SignOutGateway(apiRouteDriver);
    const registerTodoGateway = new RegisterTodoGateway(apiRouteDriver);

    const signInUseCase = new SignInUseCase(credentialGateway);
    const signUpUseCase = new SignUpUseCase(credentialGateway);
    const signOutUseCase = new SignOutUseCase(signOutGateway);
    const getTodosUseCase = new GetTodosUseCase(todoGateway);
    const storeTodoUseCase = new StoreTodoUseCase(registerTodoGateway);
    const updateTodoUseCase = new UpdateTodoUseCase(todoGateway);
    const getUserUseCase = new GetUserUseCase(userGateway);

    return {
      signInUseCase,
      signUpUseCase,
      signOutUseCase,
      getTodosUseCase,
      storeTodoUseCase,
      updateTodoUseCase,
      getUserUseCase,
    };
  }, []);

  return <DIContext.Provider value={diContainer}>{children}</DIContext.Provider>;
};

export default DiProvider;
