import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {

    @Get()
    async redirect(@Res() response: Response) {
        return response.redirect('/swagger')
    }
}