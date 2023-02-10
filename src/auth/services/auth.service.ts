import { Injectable } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { IAthenticatedUser } from "../../interfaces/IAuthenticatedUser";
import { ITrafficableUSer } from "../../interfaces/ITrafficableUser";
import { UserService } from "../../users/services/user.service";
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
            name: user.name,
            email: user.email,
            role: user.role,
            githubUrl: user.githubUrl
        }

        return {
            user: user.name,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}