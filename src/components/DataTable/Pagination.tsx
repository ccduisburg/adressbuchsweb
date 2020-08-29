import React, { FC } from 'react';

import {
  DataTablePaginationDataTableInterface,
  PaginationInput,
  PaginationInputSort,
  SortDirection,
} from './types';

export type PaginationReducerAction =
  | { type: 'SET_PAGE'; page: number }
  | { type: 'SET_PAGESIZE'; pageSize: number }
  | { type: 'FORWARD'; totalPages: number }
  | { type: 'BACK'; totalPages: number }
  | { type: 'FIRST' }
  | { type: 'SET_SORT'; fieldName: string; ctrlPressed?: boolean }
  | { type: 'LAST'; totalPages: number };

export function paginationReducer(state: PaginationInput, action: PaginationReducerAction) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, offsetPage: action.page };
    case 'SET_PAGESIZE':
      return { ...state, offsetPage: action.pageSize };
    case 'FORWARD': {
      if ((state.offsetPage ? state.offsetPage + 1 : 2) < action.totalPages) {
        return { ...state, offsetPage: state.offsetPage ? state.offsetPage + 1 : 1 };
      }
      return state;
    }
    case 'BACK': {
      if ((state.offsetPage ? state.offsetPage - 1 : 1) >= 0) {
        return { ...state, offsetPage: state.offsetPage ? state.offsetPage - 1 : 0 };
      }
      return state;
    }
    case 'FIRST': {
      if ((state.offsetPage ? state.offsetPage - 1 : 1) >= 0) {
        return { ...state, offsetPage: 0 };
      }
      return state;
    }
    case 'LAST': {
      if ((state.offsetPage ? state.offsetPage - 1 : 1) >= 0) {
        return { ...state, offsetPage: action.totalPages - 1 };
      }
      return state;
    }
    case 'SET_SORT': {
      let newSorts: Array<PaginationInputSort | null | undefined> = [];
      if (state.sorts) {
        newSorts = [...state.sorts];
        if (state.sorts) {
          const arrayIndex = state.sorts
            ? state.sorts.findIndex(osort => osort && osort.fieldName === action.fieldName)
            : -1;

          if (arrayIndex >= 0) {
            const curSort = newSorts[arrayIndex];
            if (curSort) {
              switch (curSort.sortDirection) {
                case SortDirection.Ascending:
                  curSort.sortDirection = SortDirection.Descending;
                  break;
                case SortDirection.Descending:
                  curSort.sortDirection = SortDirection.Ascending;
                  break;
                default:
                  curSort.sortDirection = SortDirection.Ascending;
              }
            }
          } else if (action.ctrlPressed) {
            newSorts[state.sorts.length] = {
              fieldName: action.fieldName,
              sortDirection: SortDirection.Descending,
            };
          } else {
            newSorts = [
              {
                fieldName: action.fieldName,
                sortDirection: SortDirection.Descending,
              },
            ];
          }
        } else {
          newSorts = [
            {
              fieldName: action.fieldName,
              sortDirection: SortDirection.Descending,
            },
          ];
        }
        return { ...state, sorts: newSorts };
      }
      return state;
    }
    default:
      return state;
  }
}
const DataTablePagination: FC<DataTablePaginationDataTableInterface> = ({
  first,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageSize,
  totalPages,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recordCount,
  setPage,
  firstPage,
  lastPage,
  nextPage,
  previosPage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPageSizeChanged,
}) => {
  // TODO Seiten filtern z.B. 1 2 ... 15 16
  const pages: Array<number> = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalPages; i++) {
    pages[i] = i;
  }

  return (
    <>
      <div>
        Seite {first + 1} / {totalPages} Seiten Gesamt
      </div>
      <div>
        <nav aria-label="...">
          <ul className="pagination">
            <DateTablePaginationLink label="<<" disabled={first === 0} onClick={firstPage} />
            <DateTablePaginationLink label="<" disabled={first === 0} onClick={previosPage} />
            {pages.map(val => (
              <DateTablePaginationLink
                key={val}
                label={`${val}`}
                onClick={() => {
                  setPage(val - 1);
                }}
                active={val === first + 1}
              />
            ))}
            <DateTablePaginationLink
              label=">"
              disabled={!(first < totalPages - 1)}
              onClick={nextPage}
            />
            <DateTablePaginationLink
              label=">>"
              disabled={!(first < totalPages - 1)}
              onClick={lastPage}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

interface DateTablePaginationLinkInterface {
  disabled?: boolean;
  active?: boolean;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}
const DateTablePaginationLink: FC<DateTablePaginationLinkInterface> = ({
  disabled,
  active,
  label,
  onClick,
}) => {
  return (
    <li className={`page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`}>
      <button type="button" className="page-link" onClick={onClick}>
        {label}
      </button>
    </li>
  );
};
export default DataTablePagination;