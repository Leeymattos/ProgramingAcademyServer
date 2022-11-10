import { Role } from "src/auth/enums/role.enum"

export interface IPayload {
    sub: string
    name: string
    role: Role
}