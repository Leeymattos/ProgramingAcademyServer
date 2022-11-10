import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Playlist } from "../entities/playlist";
import { PlaylistService } from "../services/playlist.service";

@Controller('/playlist')
export class playlistController {
    constructor(
        private readonly playlistService: PlaylistService
    ) { }

    @Post()
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
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Body() playlist: Playlist): Promise<Playlist> {
        return await this.playlistService.update(playlist);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async callDelete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.playlistService.delete(id)
    }
}