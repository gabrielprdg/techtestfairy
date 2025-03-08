import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/login/auth.controller';
import { RegisterUser } from 'src/application/use-cases/register-user';
import { AuthService } from '../services/auth.service';
import { HashService } from '../services/hash.service';
import { LoginUser } from 'src/application/use-cases/login-user';


@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    RegisterUser,
    LoginUser,
    HashService,
    AuthService
  ],
})
export class HttpModule { }
