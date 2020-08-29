export interface Person {
    id:number,
    titel:string;
    name:string,
    vorname:string,
    email: Maybe<Scalars['String']>,
    geschlecht:string,
    geburstdatum:Date,
    adresse: string;
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
