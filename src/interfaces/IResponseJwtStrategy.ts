import { Role } from "src/auth/enums/role.enum"

export interface IResponseJwtStrategy {
    id: string,
    name: string
    role: Role
}