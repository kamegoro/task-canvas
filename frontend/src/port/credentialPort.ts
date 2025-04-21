import { Credential } from '../domain/credential';

export interface CredentialPort {
  signIn(credential: Credential): Promise<void>;
  signUp(credential: Credential): Promise<void>;
}
