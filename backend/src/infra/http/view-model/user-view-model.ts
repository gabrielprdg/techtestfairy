import { User } from 'src/application/entities/account';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
