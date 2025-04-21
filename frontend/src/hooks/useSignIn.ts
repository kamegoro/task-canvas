import { useDI } from '@/context/DIContext';
import { Email, Password } from '@/domain/credential';
import { SignInUseCaseImpl } from '@/useCase/signInUseCase';

interface UseSignInInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export class UseSignIn implements UseSignInInterface {
  private readonly signInUseCase: SignInUseCaseImpl;
  private readonly credentialFactory: ReturnType<typeof useDI>['credentialFactory'];

  constructor() {
    const { credentialFactory, signInUseCase } = useDI();
    this.signInUseCase = signInUseCase;
    this.credentialFactory = credentialFactory;
  }

  async execute(email: string, password: string): Promise<void> {
    const credential = this.credentialFactory(new Email(email), new Password(password));
    await this.signInUseCase.execute(credential);
  }
}
