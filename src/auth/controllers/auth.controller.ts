import { Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express'
import { IAthenticatedUser } from "src/interfaces/IAuthenticatedUser";
import { ITrafficableUSer } from "src/interfaces/ITrafficableUser";
import { AuthService } from "../services/auth.service";

@UseGuards(AuthGuard('local'))
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Req() req: Request): IAthenticatedUser {
        return this.authService.login(req.user as ITrafficableUSer)
    }
}