import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IResponseJwtStrategy } from "../../interfaces/IResponseJwtStrategy";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({ email });
    }

    async create(user: User) {
        const userFound = await this.findByEmail(user.email);

        if (!userFound) {
            if (user.id) {
                delete (user.id);
            }
            user.password = await this.bcrypt.hashPassword(user.password);
            return await this.userRepository.save(user);
        }

        throw new HttpException('O email informado já existe!', HttpStatus.BAD_REQUEST)
    }

    async update(user: User, userValidate: IResponseJwtStrategy) {
        user.id = userValidate.id

        const userFound = await this.userRepository.findOneBy({ id: user.id });

        if (!userFound) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        const userFoundByEmail = await this.findByEmail(user.email);

        if (userFoundByEmail && userFoundByEmail.id !== user.id) {
            throw new HttpException('Email informado já existe!', HttpStatus.BAD_REQUEST);
        }

        user.password = await this.bcrypt.hashPassword(user.password)
        return await this.userRepository.save(user);
    }
}