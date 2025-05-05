import { createContext, useContext, useMemo } from 'react';

import { Credential } from '@/domain/credential';
import { RegisterTodo, Todo } from '@/domain/todo';
import { User } from '@/domain/user';
import { ApiRoutesDriver } from '@/driver';
import { CredentialGateway } from '@/gateway/credential';
import { SignOutGateway } from '@/gateway/signOutGateway';
import TodoGateway from '@/gateway/todo';
import { GetTodosUseCase } from '@/useCase/getTodosUseCase';
import { SignInUseCaseImpl } from '@/useCase/signInUseCase';
import { SignOutUseCase } from '@/useCase/signOutUseCase';
import { SignUpUseCase } from '@/useCase/signUpUseCase';
import { StoreTodoUseCase } from '@/useCase/storeTodoUseCase';
import { UpdateTodoUseCase } from '@/useCase/updateTodoUseCase';

type DIContainer = {
  credentialFactory: ReturnType<typeof Credential.factory>;
  userFactory: ReturnType<typeof User.factory>;
  todoFactory: ReturnType<typeof Todo.factory>;
  registerTodoFactory: ReturnType<typeof RegisterTodo.factory>;
  signInUseCase: SignInUseCaseImpl;
  signUpUseCase: SignInUseCaseImpl;
  signOutUseCase: SignOutUseCase;
  getTodosUseCase: GetTodosUseCase;
  storeTodoUseCase: StoreTodoUseCase;
  updateTodoUseCase: UpdateTodoUseCase;
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
    const signOutGateway = new SignOutGateway(apiRouteDriver);
    const todoGateway = new TodoGateway(apiRouteDriver);

    const credentialFactory = Credential.factory(credentialGateway);
    const userFactory = User.factory(signOutGateway);
    const todoFactory = Todo.factory(todoGateway);
    const registerTodoFactory = RegisterTodo.factory(todoGateway);

    const signInUseCase = new SignInUseCaseImpl();
    const signUpUseCase = new SignUpUseCase();
    const signOutUseCase = new SignOutUseCase();
    const getTodosUseCase = new GetTodosUseCase(todoGateway);
    const storeTodoUseCase = new StoreTodoUseCase();
    const updateTodoUseCase = new UpdateTodoUseCase(todoGateway);

    return {
      credentialFactory,
      userFactory,
      todoFactory,
      registerTodoFactory,
      signInUseCase,
      signUpUseCase,
      signOutUseCase,
      getTodosUseCase,
      storeTodoUseCase,
      updateTodoUseCase,
    };
  }, []);

  return <DIContext.Provider value={diContainer}>{children}</DIContext.Provider>;
};

export default DiProvider;
