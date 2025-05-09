import { User } from '@/domain/user';
import { UserPort } from '@/port/userPort';

interface GetUserUseCaseInterface {
  execute(): Promise<User>;
}

export class GetUserUseCase implements GetUserUseCaseInterface {
  private readonly userPort: UserPort;

  constructor(userPort: UserPort) {
    this.userPort = userPort;
  }

  static factory(userPort: UserPort): GetUserUseCase {
    return new GetUserUseCase(userPort);
  }

  async execute(): Promise<User> {
    const user = await this.userPort.get();
    return user;
  }
}
