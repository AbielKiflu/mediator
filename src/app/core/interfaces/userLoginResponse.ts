import { UserRole } from "../enums/userRole";

export interface UserLoginResponse{
    token: string;
    accessToken?: string;
    expiresAt?: number;
    id: number;
    firstName: string;
    email: string;
    role: string;
}