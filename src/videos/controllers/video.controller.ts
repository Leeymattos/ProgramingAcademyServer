import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Delete, ParseUUIDPipe } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { VideoService } from "src/videos/services/videos.service";
import { Video } from "src/videos/entities/video.entity";

@Controller('/videos')
export class VideoController {

    constructor(
        private readonly videoService: VideoService
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    callCreate(@Body() video: Video): Promise<Video> {
        return this.videoService.create(video);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    callFindAll(): Promise<Video[]> {
        return this.videoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    callFindById(@Param('id', ParseUUIDPipe) id: string): Promise<Video> {
        return this.videoService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    callFindByTitle(@Param('title') title: string): Promise<Video[]> {
        return this.videoService.findByTitle(title);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    callUpdate(@Body() video: Video): Promise<Video> {
        return this.videoService.update(video);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    callDelete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.videoService.delete(id);
    }

}