import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { playlistController } from "./controllers/playlist.controller";
import { Playlist } from "./entities/playlist";
import { PlaylistService } from "./services/playlist.service";

@Module({
    imports: [TypeOrmModule.forFeature([Playlist])],
    controllers: [playlistController],
    providers: [PlaylistService],
    exports: [TypeOrmModule]
})
export class PlaylistModule { }
