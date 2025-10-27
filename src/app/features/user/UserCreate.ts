import { LanguageDto, UserRole } from "@core/index";

export interface UserCreate {
  lastName: string;
  firstName: string;
  telephone: string;
  email: string;
  centerId: number;
  userRole: UserRole;
  languages:LanguageDto[];
}