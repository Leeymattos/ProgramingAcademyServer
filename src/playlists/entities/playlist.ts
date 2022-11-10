import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Video } from "../../videos/entities/video.entity";

@Entity({ name: 'tb_playlists' })
export class Playlist {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ length: 255, nullable: false })
    name: string

    @OneToMany(() => Video, video => video.playlist)
    video: Video[]
}