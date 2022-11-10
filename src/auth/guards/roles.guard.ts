import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IResponseJwtStrategy } from "src/interfaces/IResponseJwtStrategy";
import { ROLES_KEY } from "../../auth/decorators/role.decorator";
import { Role } from "../../auth/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user: IResponseJwtStrategy = req.user;

        console.table(user)

        return requiredRoles.some(role => user.role?.includes(role))

        //  return requiredRoles.some((role) => user.roles?.includes(role));

    }
}