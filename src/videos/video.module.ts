import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistModule } from "src/playlists/playlist.module";
import { PlaylistService } from "src/playlists/services/playlist.service";
import { VideoController } from "../videos/controllers/video.controller";
import { VideoService } from "../videos/services/videos.service";
import { Video } from "./entities/video.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Video]), PlaylistModule],
    controllers: [VideoController],
    providers: [VideoService, PlaylistService],
    exports: [TypeOrmModule]
})
export class VideoModule { }