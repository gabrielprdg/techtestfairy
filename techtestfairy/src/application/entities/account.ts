export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) { }

  static create(name: string, email: string, password: string): User {
    return new User(
      crypto.randomUUID(), // Gerando ID único
      name,
      email,
      password,
      new Date(),
      new Date(),
    );
  }
}
