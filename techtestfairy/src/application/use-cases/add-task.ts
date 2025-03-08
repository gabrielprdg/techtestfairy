import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../protocols/db/login/user-repository';
import { AuthService } from 'src/infra/services/auth.service';
import { HashService } from 'src/infra/services/hash.service';

@Injectable()
export class AddTask {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService, // Serviço para gerar o JWT
    private readonly hashService: HashService, // Serviço para comparar as senhas
  ) { }

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(user);

    return { token };
  }
}