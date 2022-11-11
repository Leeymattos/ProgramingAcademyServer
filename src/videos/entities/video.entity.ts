import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Playlist } from "../../playlists/entities/playlist"

@Entity({ name: 'tb_videos' })
export class Video {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    @ApiProperty()
    @Column({ length: 255, nullable: false })
    title: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(500)
    @ApiProperty()
    @Column({ length: 500, nullable: false })
    description: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty()
    @Column({ length: 50, nullable: false })
    url: string

    @ApiProperty({ type: () => Playlist })
    @ManyToOne(() => Playlist, playlist => playlist.video, {
        onDelete: 'CASCADE'
    })
    playlist: Playlist

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date
}