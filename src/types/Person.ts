export interface Person {
    id:number,
    titel:string;
    name:string,
    vorname:string,
    email: string,
    geschlecht:string,
    geburstdatum:Date,
    anschrift: string;
}
export type Maybe<T> = T | null | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};
export enum Geschlescht {           
  MÄNNLICH ="MÄNNLICH",
  WEIBLICH="WEIBLICH",
  DIVERS="DIVERS"
}
