import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express'

@UseGuards(AuthGuard('local'))
@Controller('auth')
export class AuthController {

    @Post('/login')
    async login(@Req() req: Request) {
        return req.user;
    }
}