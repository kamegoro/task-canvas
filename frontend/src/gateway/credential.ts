import { Credential } from '@/domain/credential';
import { ApiRoutesDriver } from '@/driver';
import { CredentialPort } from '@/port/credentialPort';

export class CredentialGateway implements CredentialPort {
  constructor(private apiRoutesDriver: ApiRoutesDriver) {}

  async signIn(credential: Credential): Promise<void> {
    await this.apiRoutesDriver.signIn(credential.getEmail(), credential.getPassword());
  }

  signUp(credential: Credential): Promise<void> {
    return this.apiRoutesDriver.signUp(credential.getEmail(), credential.getPassword());
  }
}
