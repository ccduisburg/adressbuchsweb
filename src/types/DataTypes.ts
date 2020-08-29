import { SortDirection } from "../components/DataTable/types";

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



export type PaginationInput = {
  offsetPage?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  sorts?: Maybe<Array<Maybe<PaginationInputSort>>>,
};

export type PaginationInputSort = {
  fieldName: Scalars['String'],
  sortDirection?: Maybe<SortDirection>,
};

export type PaginationPageInfo = {
   __typename?: 'PaginationPageInfo',
  totalElements: Scalars['Int'],
  totalPages: Scalars['Int'],
  number: Scalars['Int'],
  size: Scalars['Int'],
};

export type PaginationResult = {
  pageInfo: PaginationPageInfo,
  result: Array<IdEntity>,
};

export type IdEntity = {
  id: Scalars['ID'],
};

export type InputPerson = {
  vorname: Scalars['String'],
  name: Scalars['String'],
  skill?: Maybe<Scalars['String']>,
  geburtsdatum?: Maybe<Scalars['Date']>,
  title:string,  
  email:string,
  geshlecht:string,
  geburstdatum:Date,
  adresse: string;
};

