import type { Credential } from '@/domain/credential';
import type { ApiRoutesDriver } from '@/driver';
import type { CredentialPort } from '@/port/credentialPort';

export class CredentialGateway implements CredentialPort {
  constructor(private apiRoutesDriver: ApiRoutesDriver) {}

  async signIn(credential: Credential): Promise<void> {
    try {
      await this.apiRoutesDriver.signIn(credential.getEmail(), credential.getPassword());
    } catch (error) {
      console.error('CredentialGateway signIn エラー:', error);
      throw error;
    }
  }

  async signUp(credential: Credential): Promise<void> {
    try {
      return await this.apiRoutesDriver.signUp(credential.getEmail(), credential.getPassword());
    } catch (error) {
      console.error('CredentialGateway signUp エラー:', error);
      throw error;
    }
  }
}
