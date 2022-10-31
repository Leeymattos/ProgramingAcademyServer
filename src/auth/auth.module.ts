import { Module } from "@nestjs/common";
import { UserService } from "src/users/services/user.service";
import { UserModule } from "src/users/user.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [Bcrypt, AuthService, UserService],
    exports: []
})
export class AuthModule { }