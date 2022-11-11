import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../auth/decorators/role.decorator";
import { Role } from "../../auth/enums/role.enum";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Playlist } from "../entities/playlist";
import { PlaylistService } from "../services/playlist.service";

@ApiBearerAuth()
@ApiTags('Playlist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/playlist')
export class playlistController {
    constructor(
        private readonly playlistService: PlaylistService
    ) { }

    @Post()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    async callCreate(@Body() playlist: Playlist): Promise<Playlist> {
        return await this.playlistService.create(playlist);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async callFindAll(): Promise<Playlist[]> {
        return await this.playlistService.findAll();
    }

    @Put()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Body() playlist: Playlist): Promise<Playlist> {
        return await this.playlistService.update(playlist);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    async callDelete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.playlistService.delete(id)
    }
}