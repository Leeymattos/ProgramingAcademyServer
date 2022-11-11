import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Video } from "../../videos/entities/video.entity";

@Entity({ name: 'tb_playlists' })
export class Playlist {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string

    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty()
    @Column({ length: 255, nullable: false })
    name: string

    @ApiProperty()
    @OneToMany(() => Video, video => video.playlist)
    video: Video[]
}