import { Credential } from '@/domain/credential';
import { CredentialPort } from '@/port/credentialPort';

interface SignUpUseCaseInterface {
  execute: (credential: Credential) => Promise<void>;
}

export class SignUpUseCase implements SignUpUseCaseInterface {
  private readonly credentialPort: CredentialPort;

  constructor(credentialPort: CredentialPort) {
    this.credentialPort = credentialPort;
  }

  async execute(credential: Credential): Promise<void> {
    try {
      return await this.credentialPort.signUp(credential);
    } catch (error) {
      console.error('SignUpUseCase: エラー発生:', error);
      throw error;
    }
  }
}
