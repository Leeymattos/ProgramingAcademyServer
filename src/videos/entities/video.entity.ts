import { IsNotEmpty } from "class-validator"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'tb_videos' })
export class Video {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    title: string

    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    description: string

    @IsNotEmpty()
    @Column({ length: 50, nullable: false })
    url: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}