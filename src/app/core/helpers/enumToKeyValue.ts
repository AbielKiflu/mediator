import { OptionValue } from "@core/interfaces/OptionValue";
import { EnumKeyValue } from "./keyValue";

//This function helps convert an enum to key value to bind it easily into select element (for the moment the enums are keyvalues from 0)
export const getEnumValues = (enumObject: any): EnumKeyValue[] => {
    const keys = Object.keys(enumObject).filter(key => isNaN(Number(key)));
    return keys.map(key => ({
      key: enumObject[key] as number,
      value: key,
    }));
  }

  export function enumToOptions<T extends object>(enumObj: T): OptionValue<T[keyof T]>[] {
  return Object.keys(enumObj)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value: enumObj[key as keyof T],
      viewValue: key
    }));
}
