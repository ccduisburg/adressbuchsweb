/* eslint @typescript-eslint/no-explicit-any: "off" */
export interface DataTableInterface {
    showHeader?: boolean;
    showSuche?:Boolean;
    data: Array<any> | null | undefined;
    idColumnName: string;
    columns: Array<DataTableColumn<any>>;
    pagination?: DataTablePaginationDataTableInterface;
    scrollPagination?: DataTableInfinityLoaderScrollNavigator;
}
export interface DataTableColumn<E> {
    name: string;
    suchname?:string;
    sortBy?: PaginationInputSort;
    width?: number | string | undefined;  
    accessor: (data: E) => {} | null | undefined;
}

export interface DataTablePaginationDataTableInterface {
    recordCount: number;
    first: number;
    pageSize: number;
    totalPages: number;
    setPage: (first: number) => void;
    firstPage: () => void;
    lastPage: () => void;
    nextPage: () => void;
    previosPage: () => void;
    onPageSizeChanged?: (pageSize: number) => void;
}

export interface DataTableScrollPaginationInterface extends InfiniteLoaderInterface {
    loadMore: (data: PaginationResult) => Promise<any>;
    totalItems: number;
    resultData: PaginationResult;
}
export interface InfiniteLoaderInterface {
    data: Array<any>;
    columns: Array<DataTableColumn<any>>;
    navigator: DataTableInfinityLoaderScrollNavigator;
}

export interface DataTableInfinityLoaderItemInterface {
    index: number;
    style: any;
}
export interface DataTableInfinityLoaderScrollNavigator {
    data: PaginationResult | null | undefined;
    recordData: [];
    pageLoadMore: (data: PaginationResult | null | undefined) => Promise<any>;
    sortChanged: (data: PaginationInputSort, append: boolean) => Promise<any> | void;
    sorts?: Array<PaginationInputSort | null | undefined>;
    getKeyForData: (row: any, index: number) => string;
    loading: boolean;
}

/** Wrapper GraphQLPaginationInput etc.pp um die Komponenten exportierbar zu machen. Maybe wird hierbei zu  | null | undefined * */

export type PaginationInput = {
    offsetPage?: number | null | undefined;
    pageSize?: number | null | undefined;
    sorts?: Array<PaginationInputSort | null | undefined> | null | undefined;
};
export type PaginationResult = {
    pageInfo: PaginationPageInfo;
    result: Array<any>;
};
export type PaginationInputSort = {
    fieldName: string;
    sortDirection?: SortDirection | null | undefined;
};
// eslint-disable-next-line import/prefer-default-export
export enum SortDirection {
    Ascending = 'ASCENDING',
    Descending = 'DESCENDING',
}
export interface DataTableColumn<E> {
    name: string;
    sortBy?: PaginationInputSort;
    width?: number | string | undefined;  
    accessor: (data: E) => {} | null | undefined;
}
export type PaginationPageInfo = {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
};