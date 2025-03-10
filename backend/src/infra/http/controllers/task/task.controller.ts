import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AddTask } from 'src/application/use-cases/add-task';
import { AddTaskBody } from '../../dtos/add-task';
import { UpdateTaskBody } from '../../dtos/update-task';
import { FindByStatus } from 'src/application/use-cases/find-by-status';
import { LoadTasks } from 'src/application/use-cases/load-taks';
import { DeleteTask } from 'src/application/use-cases/delete-taks';
import { UpdateTask } from 'src/application/use-cases/update-task';
import { TaskViewModel } from '../../view-model/task-view-model';
import { LoadUsers } from 'src/application/use-cases/load-users';
import { FindById } from 'src/application/use-cases/find-by-id';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(
    private readonly addTask: AddTask,
    private readonly findByStatus: FindByStatus,
    private readonly loadTask: LoadTasks,
    private readonly deleteTask: DeleteTask,
    private readonly updateTask: UpdateTask,
    private readonly loadUsers: LoadUsers,
    private readonly findById: FindById

  ) { }

  @Post()
  @HttpCode(204)
  @ApiOperation({ summary: 'Criar tarefas' })
  @ApiResponse({ status: 204, description: 'Criação de tarefas.' })
  @ApiResponse({ status: 409, description: 'Usuário não existe.' })
  async create(@Body() body: AddTaskBody) {
    const { title, description, userId } = body;

    await this.addTask.execute({
      title,
      description,
      userId
    });
  }

  @Get('from/:id')
  @ApiOperation({ summary: 'Listar tarefa pelo id' })
  @ApiResponse({ status: 200, description: 'Lista de tarefa pelo id.' })
  @ApiResponse({ status: 409, description: 'Tarefa inexistente.' })
  async findTasksById(@Param('id') id: string) {
    const { task } = await this.findById.execute(id)

    return TaskViewModel.toHTTP(task);
  }


  @Get(':status')
  @ApiOperation({ summary: 'Listar tarefas pelo status' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas pelo status.' })
  @ApiResponse({ status: 409, description: 'Status inexistente' })
  async findTasksByStatus(@Param('status') status: string) {
    const { tasks } = await this.findByStatus.execute(status)

    return tasks.map(TaskViewModel.toHTTP);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista de todas as tarefas' })
  async loadAll() {
    const { tasks } = await this.loadTask.execute()
    return tasks.map(TaskViewModel.toHTTP);
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Deletar tarefas pelo id' })
  @ApiResponse({ status: 200, description: 'Deleta tarefa pelo id.' })
  @ApiResponse({ status: 409, description: 'Tarefa inexistente.' })
  async delete(@Param('id') id: string) {
    await this.deleteTask.execute(id);
  }

  @Patch(':id/update')
  @ApiOperation({ summary: 'Atualizar tarefas pelo id' })
  @ApiResponse({ status: 200, description: 'Atualiza tarefa pelo status.' })
  @ApiResponse({ status: 409, description: 'Tarefa inexistente.' })
  async update(@Param('id') id: string, @Body() body: UpdateTaskBody) {
    const { title, description, status } = body;

    const { task } = await this.updateTask.execute({
      id,
      title,
      description,
      status
    });

    return TaskViewModel.toHTTP(task);
  }

  @ApiOperation({ summary: 'Listar todos os usuários com seus ids' })
  @ApiResponse({ status: 200, description: 'Listagem de usuários' })
  @Get('users/list')
  async findUsers() {
    const { users } = await this.loadUsers.execute()
    return users.map(TaskViewModel.userToHTTP);
  }
}