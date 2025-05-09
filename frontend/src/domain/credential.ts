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
  ) {}

  factory(email: Email, password: Password): Credential {
    return new Credential(email, password);
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPassword(): string {
    return this.password.getValue();
  }
}
