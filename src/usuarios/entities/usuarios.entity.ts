import { IsNotEmpty } from 'class-validator';
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'


@Entity({ name: 'tb_usuarios' })
export class Usuario {

    @ObjectIdColumn()
    _id: ObjectID

    @IsNotEmpty()
    @Column({ length: 150, nullable: false })
    name: string;

    @IsNotEmpty()
    @Column({ length: 200, nullable: false })
    email: string;

    @IsNotEmpty()
    @Column({ length: 20, nullable: false })
    passsword: string;
}