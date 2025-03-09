import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class AddTaskBody {
  @IsNotEmpty()
  @Length(5, 200)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: string;
}