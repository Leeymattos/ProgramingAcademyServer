import { Role } from "src/auth/enums/role.enum";

export interface ITrafficableUSer {
    id: string
    name: string;
    email: string;
    githubUrl: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role
}