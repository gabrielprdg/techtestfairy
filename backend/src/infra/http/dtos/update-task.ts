import { Length } from 'class-validator';

export class UpdateTaskBody {
  @Length(5, 200)
  title: string;

  @Length(5, 200)
  description: string;

  status: string
}