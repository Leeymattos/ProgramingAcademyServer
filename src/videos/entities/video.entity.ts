import { IsNotEmpty, MaxLength, MinLength } from "class-validator"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}