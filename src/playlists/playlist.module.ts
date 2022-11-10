import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist";

@Module({
    imports: [TypeOrmModule.forFeature([Playlist])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule]
})
export class PlaylistModule { }
