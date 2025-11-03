import { LanguageDto, UserRole } from "@core/index";

export interface UserUpdateModel {
  id:number;
  lastName: string;
  firstName: string;
  telephone: string;
  centerId: number;
  pauseStartDate?: Date;
  pauseEndDate?: Date;
  googleId?: string;
  userRole: UserRole;
  languages:LanguageDto[];
}