import { SignOutPort } from '@/port/signOutPort';

import { Email } from './credential';

export class User {
  constructor(
    private readonly email: Email,
    private signOutPort: SignOutPort,
  ) {}

  static factory(signOutPort: SignOutPort): (email: Email) => User {
    return (email: Email) => {
      return new User(email, signOutPort);
    };
  }

  signOut(): void {
    this.signOutPort.signOut();
  }
}
