import { LanguageDto, UserRole } from "@core/index";

export interface UserLoggedModel {
  id:number;
  fullname: string;
  email: string;
  role: string,
  center:string
}