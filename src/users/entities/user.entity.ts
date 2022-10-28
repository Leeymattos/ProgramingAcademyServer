import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity({ name: 'tb_users' })
export class User {

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