import { randomUUID } from "node:crypto"
import { Replace } from "src/helpers/replace"

export interface TaskModel {
  title: string
  description: string
  status?: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export class Task {

  private _id: string
  private props: TaskModel

  constructor(
    props: Replace<TaskModel, { createdAt?: Date, updatedAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      status: 'pending',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }


  public get id() {
    return this._id;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }


  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set status(status: string) {
    this.props.status = status;
  }



  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
