import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, MaxLength, MinLength } from "class-validator"
import { Playlist } from "../../playlists/entities/playlist"

@Entity({ name: 'tb_videos' })
export class Video {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    @Column({ length: 255, nullable: false })
    title: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(500)
    @Column({ length: 500, nullable: false })
    description: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @Column({ length: 50, nullable: false })
    url: string

    @ManyToOne(() => Playlist, playlist => playlist.video, {
        onDelete: 'CASCADE'
    })
    playlist: Playlist

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}