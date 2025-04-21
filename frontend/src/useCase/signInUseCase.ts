import { Credential } from '@/domain/credential';

interface SignInUseCase {
  execute: (credential: Credential) => Promise<void>;
}

export class SignInUseCaseImpl implements SignInUseCase {
  async execute(credential: Credential): Promise<void> {
    await credential.signIn();
  }
}
