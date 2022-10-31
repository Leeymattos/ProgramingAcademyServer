import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Delete, ParseUUIDPipe } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { VideoService } from "src/videos/services/videos.service";
import { Video } from "src/videos/entities/video.entity";

@Controller('/video')
export class VideoController {

    constructor(
        private readonly videoService: VideoService
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async callCreate(@Body() video: Video): Promise<Video> {
        return await this.videoService.create(video);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async callFindAll(): Promise<Video[]> {
        return await this.videoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Video> {
        return await this.videoService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    async callFindByTitle(@Param('title') title: string): Promise<Video[]> {
        return await this.videoService.findByTitle(title);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async callUpdate(@Body() video: Video): Promise<Video> {
        return await this.videoService.update(video);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async callDelete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return await this.videoService.delete(id);
    }

}