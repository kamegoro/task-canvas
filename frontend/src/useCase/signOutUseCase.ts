import { SignOutPort } from '@/port/signOutPort';

interface SignOutUseCaseInterface {
  execute: () => void;
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
