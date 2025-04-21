import { createContext, useContext } from 'react';

import { Credential } from '@/domain/credential';
import { User } from '@/domain/user';
import { ApiRoutesDriver } from '@/driver';
import { CredentialGateway } from '@/gateway/credential';
import { SignOutGateway } from '@/gateway/signOutGateway';
import { SignInUseCaseImpl } from '@/useCase/signInUseCase';
import { SignOutUseCase } from '@/useCase/signOutUseCase';
import { SignUpUseCase } from '@/useCase/signUpUseCase';

type DIContainer = {
  credentialFactory: ReturnType<typeof Credential.factory>;
  userFactory: ReturnType<typeof User.factory>;
  signInUseCase: SignInUseCaseImpl;
  signUpUseCase: SignInUseCaseImpl;
  signOutUseCase: SignOutUseCase;
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
  const apiRouteDriver = new ApiRoutesDriver('http://localhost:3000');

  const credentialGateway = new CredentialGateway(apiRouteDriver);
  const signOutGateway = new SignOutGateway(apiRouteDriver);

  const credentialFactory = Credential.factory(credentialGateway);
  const userFactory = User.factory(signOutGateway);

  const signInUseCase = new SignInUseCaseImpl();
  const signUpUseCase = new SignUpUseCase();
  const signOutUseCase = new SignOutUseCase();

  const diContainer: DIContainer = {
    credentialFactory,
    userFactory,
    signInUseCase,
    signUpUseCase,
    signOutUseCase,
  };

  return <DIContext.Provider value={diContainer}>{children}</DIContext.Provider>;
};

export default DiProvider;
