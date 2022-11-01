import { Injectable } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express'
import { IAthenticatedUser } from "src/interfaces/IAuthenticatedUser";
import { ITrafficableUSer } from "src/interfaces/ITrafficableUser";
import { UserService } from "src/users/services/user.service";
import { Bcrypt } from "../bcrypt/bcrypt";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly bcrypt: Bcrypt,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<ITrafficableUSer | null> {

        const userFound = await this.userService.findByEmail(email);

        if (!userFound) {
            return null;
        }

        const match = this.bcrypt.comparePassword(password, userFound.password);

        if (userFound && match) {
            const { password, ...trafficableUser } = userFound;
            return trafficableUser
        }

        return null;
    }

    login(user: ITrafficableUSer): IAthenticatedUser {

        const payload = {
            sub: user.id,
            name: user.name
        }

        return {
            user: user.name,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}