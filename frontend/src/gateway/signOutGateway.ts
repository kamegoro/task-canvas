import type { ApiRoutesDriver } from '@/driver';
import type { SignOutPort } from '@/port/signOutPort';

export class SignOutGateway implements SignOutPort {
  constructor(private readonly apiRoutesDriver: ApiRoutesDriver) {}

  async signOut(): Promise<void> {
    await this.apiRoutesDriver.signOut();
  }
}
