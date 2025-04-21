import { useDI } from '@/context/DIContext';
import { Email } from '@/domain/credential';

interface UseSignOutInterface {
  execute: (email: string) => void;
}

export class UseSignOut implements UseSignOutInterface {
  private readonly signOutUseCase: ReturnType<typeof useDI>['signOutUseCase'];
  private readonly userFactory: ReturnType<typeof useDI>['userFactory'];

  constructor() {
    const { signOutUseCase, userFactory } = useDI();
    this.signOutUseCase = signOutUseCase;
    this.userFactory = userFactory;
  }

  execute(email: string): void {
    const user = this.userFactory(new Email(email));
    this.signOutUseCase.execute(user);
  }
}
