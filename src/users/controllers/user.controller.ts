import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('/user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async callFindAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async callCreate(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Body() user: User): Promise<User> {
        return await this.userService.update(user);
    }

}