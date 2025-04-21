import { useDI } from '@/context/DIContext';
import { Email, Password } from '@/domain/credential';

interface UseSignUpInterface {
  execute: (email: string, password: string) => Promise<void>;
}

export class UseSignUp implements UseSignUpInterface {
  private readonly signUpUseCase: ReturnType<typeof useDI>['signUpUseCase'];
  private readonly credentialFactory: ReturnType<typeof useDI>['credentialFactory'];

  constructor() {
    const { credentialFactory, signUpUseCase } = useDI();
    this.signUpUseCase = signUpUseCase;
    this.credentialFactory = credentialFactory;
  }

  async execute(email: string, password: string): Promise<void> {
    const credential = this.credentialFactory(new Email(email), new Password(password));
    await this.signUpUseCase.execute(credential);
  }
}
