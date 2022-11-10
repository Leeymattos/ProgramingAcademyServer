import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UserService } from "../users/services/user.service";
import { UserModule } from "../users/user.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '24h' }
        })
    ],
    controllers: [AuthController],
    providers: [Bcrypt, AuthService, UserService, LocalStrategy, JwtStrategy],
    exports: []
})
export class AuthModule { }