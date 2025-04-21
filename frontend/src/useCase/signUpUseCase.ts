import { Credential } from '@/domain/credential';

interface SignUpUseCaseInterface {
  execute: (credential: Credential) => Promise<void>;
}

export class SignUpUseCase implements SignUpUseCaseInterface {
  async execute(credential: Credential): Promise<void> {
    await credential.signUp();
  }
}
