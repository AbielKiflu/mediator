import { UserRole } from "../../core/enums/userRole";
import { CenterDto } from "../../core/services/centerDto";
import { LanguageDto } from "../../core/services/languageDto";

export interface UserDto {
  id: number;
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