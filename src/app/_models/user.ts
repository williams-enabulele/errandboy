import { Role } from "./role";

export interface User {
    id: number;
    status: string;
    data: any;
    role: Role;
    token: string;
}
