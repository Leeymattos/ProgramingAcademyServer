import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, IsNotEmpty, maxLength, MaxLength, Min, MinLength } from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

@Entity({ name: 'tb_users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    @Column({ length: 255, nullable: false })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    @Column({ length: 255, nullable: false })
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(255)
    @Column({ length: 255, nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}