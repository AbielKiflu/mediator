import { LanguageDto, UserRole } from "@core/index";

export interface UserCreateModel {
  lastName: string;
  firstName: string;
  telephone: string;
  email: string;
  centerId: number;
  userRole: UserRole;
  languages:LanguageDto[];
}