import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '@infra/repositories/user.repository';
import { User } from '@application/entity/user.entity';
import { HashService } from '@infra/services/hash.service'; // Serviço de hash para senhas

interface UserDataRequest {
  username: string
  email: string
  password: string
}

@Injectable()
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) { }

  async execute(userData: UserDataRequest) {
    const { username, email, password } = userData

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await this.hashService.hash(password);

    const user = new User(username, email, hashedPassword);

    await this.userRepository.save(user);

    return { user };
  }
}