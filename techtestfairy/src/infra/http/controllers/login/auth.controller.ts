import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUser } from 'src/application/use-cases/login-user';
import { RegisterUser } from 'src/application/use-cases/register-user';
import { RegisterUserBody } from '../../dtos/register-user-body';
import { LoginUserBody } from '../../dtos/login-user-body';
import { UserViewModel } from '../../view-model/user-view-model';
import { TaskViewModel } from '../../view-model/task-view-model';
import { LoadUsers } from 'src/application/use-cases/load-users';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUser: LoginUser,
    private readonly registerUser: RegisterUser,
  ) { }

  @Post('register')
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
  async login(@Body() body: LoginUserBody) {
    const { email, password } = body;

    const { token } = await this.loginUser.execute(email, password);

    return { token };
  }
}