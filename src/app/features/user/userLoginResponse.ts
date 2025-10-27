import { UserRole } from "../../core/enums/userRole";

export interface UserLoginResponse{
    id: number;
    fullname: string;
    email: string;
    token: string;
    role: string;
    center: string;
    expiresAt?: number;
}