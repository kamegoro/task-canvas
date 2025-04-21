import { CredentialPort } from '@/port/credentialPort';

export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.value = email;
  }

  getValue(): string {
    return this.value;
  }
}

export class Password {
  private readonly value: string;

  constructor(password: string) {
    this.value = password;
  }

  getValue(): string {
    return this.value;
  }
}

export class Credential {
  constructor(
    private email: Email,
    private password: Password,
    private credentialPort: CredentialPort,
  ) {}

  static factory(credentialPort: CredentialPort): (email: Email, password: Password) => Credential {
    return (email: Email, password: Password) => {
      return new Credential(email, password, credentialPort);
    };
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPassword(): string {
    return this.password.getValue();
  }

  getCredential(): { email: Email; password: Password } {
    return {
      email: this.email,
      password: this.password,
    };
  }

  signIn(): Promise<void> {
    return this.credentialPort.signIn(this);
  }

  signUp(): Promise<void> {
    return this.credentialPort.signUp(this);
  }
}
