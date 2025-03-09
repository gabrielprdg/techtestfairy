import { Injectable } from "@nestjs/common";
import { User } from "../entities/account";
import { UserRepository } from "../protocols/db/login/user-repository";

type GetUserResponse = {
  users: User[];
};

@Injectable()
export class LoadUsers {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(): Promise<GetUserResponse> {
    const users = await this.userRepository.findUsers();

    return {
      users
    };
  }
}
