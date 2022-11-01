import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('/user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Body() user: User): Promise<User> {
        return await this.userService.update(user);
    }

}