import { Controller, Get, Res } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { Response } from "express";

@Controller()
export class AppController {

    @ApiExcludeEndpoint()
    @Get()
    async redirect(@Res() response: Response) {
        return response.redirect('/swagger')
    }
}