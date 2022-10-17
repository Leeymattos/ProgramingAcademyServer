import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoController } from "src/controllers/video.controller";
import { VideoService } from "src/services/videos.service";
import { Video } from "./entities/video.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Video])],
    controllers: [VideoController],
    providers: [VideoService],
    exports: [TypeOrmModule]
})
export class VideoModule { }