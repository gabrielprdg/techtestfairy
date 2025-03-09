import { Body, Controller, Post } from '@nestjs/common';
import { LoginUser } from 'src/application/use-cases/login-user';
import { RegisterUser } from 'src/application/use-cases/register-user';
import { LoginUserBody } from '../../dtos/login-user-body';
import { RegisterUserBody } from '../../dtos/register-user-body';
import { UserViewModel } from '../../view-model/user-view-model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUser: LoginUser,
    private readonly registerUser: RegisterUser,
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário registrado' })
  async register(@Body() body: RegisterUserBody) {
    const { name, email, password } = body;

    const { user } = await this.registerUser.execute({
      name,
      email,
      password,
    });

    return UserViewModel.toHTTP(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar na api' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado' })
  async login(@Body() body: LoginUserBody) {
    const { email, password } = body;

    const { token } = await this.loginUser.execute(email, password);

    return { token };
  }
}