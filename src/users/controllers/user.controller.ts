import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { IResponseJwtStrategy } from "src/interfaces/IResponseJwtStrategy";
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
    async callUpdate(@Req() req: Request) {
        return await this.userService.update(req.body, req.user as IResponseJwtStrategy);
    }

}