import { Injectable, ConflictException } from '@nestjs/common';// Serviço de hash para senhas
import { UserRepository } from '../protocols/db/login/user-repository';
import { HashService } from 'src/infra/services/auth.service';
import { User } from '../entities/account';

interface RegisterUserDataRequest {
  name: string
  email: string
  password: string
}

@Injectable()
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) { }

  async execute(userData: RegisterUserDataRequest) {
    const { name, email, password } = userData

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await this.hashService.hash(password);

    const user = new User({
      name,
      email,
      hashedPassword
    })

    await this.userRepository.create(user);

    return { user };
  }
}