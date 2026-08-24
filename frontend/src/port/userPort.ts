import type { Email } from '@/domain/credential';
import type { User } from '@/domain/user';

export interface UserPort {
  get: () => Promise<User>;
}

export interface UserFactoryPort {
  create: (email: Email) => User;
}
