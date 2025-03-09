import { randomUUID } from "node:crypto"
import { Replace } from "src/helpers/replace"
export interface UserModel {
  name: string
  email: string
  hashedPassword: string
  createdAt: Date
}
export class User {
  private _id: string;
  private props: UserModel;

  constructor(
    props: Replace<UserModel, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.hashedPassword = password;
  }

  public get password() {
    return this.props.hashedPassword;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
