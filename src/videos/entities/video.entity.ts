import { IsNotEmpty } from "class-validator"
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from "typeorm"

@Entity({ name: 'tb_videos' })
export class Video {

    @ObjectIdColumn()
    _id: ObjectID

    @Index({ fulltext: true })
    @IsNotEmpty()
    @Column({ length: 150, nullable: false })
    title: string

    @IsNotEmpty()
    @Column({ length: 350, nullable: false })
    description: string

    @IsNotEmpty()
    @Column({ length: 350, nullable: false })
    url: string
}