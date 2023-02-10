import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/enums/role.enum';

@Entity({ name: 'tb_users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(255)
    @ApiProperty()
    @Column({ length: 255, nullable: false })
    name: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(500)
    @ApiProperty()
    @Column({ length: 500, nullable: false })
    githubUrl: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    @ApiProperty()
    @Column({ length: 255, nullable: false })
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(255)
    @ApiProperty()
    @Column({ length: 255, nullable: false })
    password: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date
}