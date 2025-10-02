import { UserRole } from "../enums/userRole";
import { CenterDto } from "./centerDto";
import { LanguageDto } from "./languageDto";

export interface UserDto {
    lastName: string;
    firstName: string;
    telephone: string;
    email: string;
    pauseStartDate?: Date;
    pauseEndDate?: Date;
    googleId?: string;
    center: CenterDto;
    userRole: UserRole;
    languages: LanguageDto[];
  }