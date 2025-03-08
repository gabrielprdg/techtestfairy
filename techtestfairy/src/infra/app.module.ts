import { Module } from '@nestjs/common';
import { AuthController } from './http/controllers/login/auth.controller';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule { }
