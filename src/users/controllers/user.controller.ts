import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Roles } from "../../auth/decorators/role.decorator";
import { Role } from "../../auth/enums/role.enum";
import { IResponseJwtStrategy } from "../../interfaces/IResponseJwtStrategy";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('/user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
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

    @UseGuards(JwtAuthGuard)
    @Roles(Role.User)
    @Put()
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Req() req: Request) {
        return await this.userService.update(req.body, req.user as IResponseJwtStrategy);
    }

}