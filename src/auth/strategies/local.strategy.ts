import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ITrafficableUSer } from 'src/interfaces/ITrafficableUser';
import { AuthService } from "../services/auth.service";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string): Promise<ITrafficableUSer> {
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}