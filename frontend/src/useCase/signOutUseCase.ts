import { User } from '@/domain/user';
import { SignOutPort } from '@/port/signOutPort';

interface SignOutUseCaseInterface {
  execute: (user: User) => void;
}

export class SignOutUseCase implements SignOutUseCaseInterface {
  private readonly signOutPort: SignOutPort;

  constructor(signOutPort: SignOutPort) {
    this.signOutPort = signOutPort;
  }

  execute(): void {
    this.signOutPort.signOut();
  }
}
