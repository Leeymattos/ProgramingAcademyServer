import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Delete, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { VideoService } from "../../videos/services/videos.service";
import { Video } from "../../videos/entities/video.entity";
import { Roles } from "../../auth/decorators/role.decorator";
import { Role } from "../../auth/enums/role.enum";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/video')
export class VideoController {

    constructor(
        private readonly videoService: VideoService
    ) { }

    @Post()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    async callCreate(@Body() video: Video): Promise<Video> {
        return await this.videoService.create(video);
    }

    @Get()
    @Roles(Role.User)
    @HttpCode(HttpStatus.OK)
    async callFindAll(): Promise<Video[]> {
        return await this.videoService.findAll();
    }

    @Get('/:id')
    @Roles(Role.User)
    @HttpCode(HttpStatus.OK)
    async callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Video> {
        return await this.videoService.findById(id);
    }

    @Get('/title/:title')
    @Roles(Role.User)
    @HttpCode(HttpStatus.OK)
    async callFindByTitle(@Param('title') title: string): Promise<Video[]> {
        return await this.videoService.findByTitle(title);
    }

    @Get('/playlist/:id')
    @Roles(Role.User)
    @HttpCode(HttpStatus.OK)
    async callFindByPlaylist(@Param('id', ParseUUIDPipe) playlistId: string) {
        return await this.videoService.findByPlaylist(playlistId);
    }

    @Put()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Body() video: Video): Promise<Video> {
        return await this.videoService.update(video);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    async callDelete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return await this.videoService.delete(id);
    }

}