import { ApiRoutesDriver } from '@/driver';
import { SignOutPort } from '@/port/signOutPort';

export class SignOutGateway implements SignOutPort {
  constructor(private readonly apiRoutesDriver: ApiRoutesDriver) {}

  async signOut(): Promise<void> {
    await this.apiRoutesDriver.signOut();
  }
}
