import { Email } from './credential';

export class User {
  constructor(private readonly email: Email) {}

  static factory(email: Email): User {
    return new User(email);
  }

  getEmail(): Email {
    return this.email;
  }
}
