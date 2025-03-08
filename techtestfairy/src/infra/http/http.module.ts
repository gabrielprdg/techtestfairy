import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/login/auth.controller';
import { RegisterUser } from 'src/application/use-cases/register-user';
import { AuthService } from '../services/auth.service';
import { HashService } from '../services/hash.service';
import { LoginUser } from 'src/application/use-cases/login-user';
import { TaskController } from './controllers/task/task.controller';
import { AddTask } from 'src/application/use-cases/add-task';
import { FindByStatus } from 'src/application/use-cases/find-by-status';
import { LoadTasks } from 'src/application/use-cases/load-taks';
import { DeleteTask } from 'src/application/use-cases/delete-taks';
import { UpdateTask } from 'src/application/use-cases/update-task';


@Module({
  imports: [DatabaseModule],
  controllers: [AuthController, TaskController],
  providers: [
    AddTask,
    FindByStatus,
    LoadTasks,
    DeleteTask,
    UpdateTask,
    RegisterUser,
    LoginUser,
    HashService,
    AuthService
  ],
})
export class HttpModule { }
