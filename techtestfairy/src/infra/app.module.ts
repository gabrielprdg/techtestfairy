import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { TaskController } from './http/controllers/task/task.controller';
import { AuthService } from './services/auth.service';

@Module({
  providers: [AuthService],
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes(TaskController);
  }
}
