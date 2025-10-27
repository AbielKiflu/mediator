import { EnumKeyValue } from "./keyValue";

//This function helps convert an enum to key value to bind it easily into select element
export const getEnumValues = (enumObject: any): EnumKeyValue[] => {
    const keys = Object.keys(enumObject).filter(key => isNaN(Number(key)));
    return keys.map(key => ({
      key: enumObject[key] as number,
      value: key,
    }));
  }