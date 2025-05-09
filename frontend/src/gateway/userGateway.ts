import { Email } from '@/domain/credential';
import { User } from '@/domain/user';
import { ApiRoutesDriver } from '@/driver';
import { UserPort } from '@/port/userPort';

export class UserGateway implements UserPort {
  private readonly apiRoutesDriver: ApiRoutesDriver;

  constructor(apiRoutesDriver: ApiRoutesDriver) {
    this.apiRoutesDriver = apiRoutesDriver;
  }

  async get(): Promise<User> {
    const driverUser = await this.apiRoutesDriver.getUser();

    return User.factory(new Email(driverUser.email));
  }
}
