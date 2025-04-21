import { User } from '@/domain/user';

interface SignOutUseCaseInterface {
  execute: (user: User) => void;
}

export class SignOutUseCase implements SignOutUseCaseInterface {
  execute(user: User): void {
    return user.signOut();
  }
}
