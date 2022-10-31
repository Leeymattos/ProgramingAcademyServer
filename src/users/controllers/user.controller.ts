import { Controller } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    async callFindAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    async callCreate(user: User): Promise<User> {
        return await this.userService.create(user);
    }

    async callUpdate(user: User): Promise<User> {
        return await this.userService.update(user);
    }

}