import { Credential } from '@/domain/credential';
import { CredentialPort } from '@/port/credentialPort';

interface SignInUseCaseInterface {
  execute: (credential: Credential) => Promise<void>;
}

export class SignInUseCase implements SignInUseCaseInterface {
  private readonly credentialPort: CredentialPort;

  constructor(credentialPort: CredentialPort) {
    this.credentialPort = credentialPort;
  }

  async execute(credential: Credential): Promise<void> {
    await this.credentialPort.signIn(credential);
  }
}
