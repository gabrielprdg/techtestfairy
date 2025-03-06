import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@infra/repositories/user.repository';
import { AuthService } from 'src/infra/services/hash.service';
import { HashService } from 'src/infra/services/auth.service';


@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService, // Serviço para gerar o JWT
    private readonly hashService: HashService, // Serviço para comparar as senhas
  ) { }

  async execute(email: string, password: string) {
    // 1. Verifica se o usuário existe
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Verifica se a senha fornecida corresponde ao hash armazenado
    const isPasswordValid = await this.hashService.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Gera um JWT
    const token = this.authService.generateToken(user);

    // 4. Retorna o token JWT
    return { token };
  }
}