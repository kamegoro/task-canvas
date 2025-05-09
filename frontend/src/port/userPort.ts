import { Email } from '@/domain/credential';
import { User } from '@/domain/user';

export interface UserPort {
  get: () => Promise<User>;
}

export interface UserFactoryPort {
  create: (email: Email) => User;
}
