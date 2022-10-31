import { ITrafficableUSer } from "src/interfaces/ITrafficableUser";
import { UserService } from "src/users/services/user.service";
import { Bcrypt } from "../bcrypt/bcrypt";


export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly bcrypt: Bcrypt
    ) { }

    async validateUser(email: string, password: string): Promise<ITrafficableUSer | null> {

        const userFound = await this.userService.findByEmail(email);

        if (!userFound) {
            return null;
        }

        const match = this.bcrypt.comparePassword(password, userFound.passsword);

        if (userFound && match) {
            const { passsword, ...trafficableUser } = userFound;
            return trafficableUser
        }

        return null;
    }
}