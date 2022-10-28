import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm'


@Entity({ name: 'tb_usuarios' })
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Column({ length: 255, nullable: false })
    email: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    passsword: string;
}