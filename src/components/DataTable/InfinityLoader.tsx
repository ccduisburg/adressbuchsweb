/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import React, { FC, useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import {
  InfiniteLoaderInterface,
  DataTableInfinityLoaderItemInterface,
  DataTableColumn,
  SortDirection,
  PaginationInputSort,
} from './types';
 import useCtrlKeyPressed from './../../util/useCtrlKeyPressed';

/* eslint @typescript-eslint/no-explicit-any: "off" */

const DataTableInfinityLoader: FC<InfiniteLoaderInterface> = ({ data, columns, navigator }) => {
const ctrlKeyPressed = useCtrlKeyPressed();
  const fixedSizeListRef = useRef<FixedSizeList | undefined | null>(null);
  const isItemLoaded = (index: number) => {
    return index < (navigator.data && navigator.data.result ? navigator.data.result.length : 0);
  };
  const [totalItems, setTotalItems] = useState(
    navigator.data && navigator.data.pageInfo && navigator.data.pageInfo.totalElements
      ? navigator.data.pageInfo.totalElements
      : 0,
  );

  useEffect(() => {
    if (!navigator.loading) {
      setTotalItems(
        navigator.data && navigator.data.pageInfo && navigator.data.pageInfo.totalElements
          ? navigator.data.pageInfo.totalElements
          : 0,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    const currentPage =
      navigator.data && navigator.data.pageInfo && navigator.data.pageInfo.number
        ? navigator.data.pageInfo.number
        : 0;
    const pageSize =
      navigator.data && navigator.data.pageInfo && navigator.data.pageInfo.size
        ? navigator.data.pageInfo.size
        : 20;
    if (stopIndex > (currentPage + 1) * pageSize) {
      const promise = navigator.pageLoadMore(navigator.data);
      if (promise) return promise;
    }
    return new Promise(() => {});
  };

  const Row: FC<DataTableInfinityLoaderItemInterface> = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = 'Lade...';
    } else if (data.length > index) {
      content = columns.map(column => (
        <div
          key={column.name}
          style={{ flexGrow: 1, flexShrink: 1, flexBasis: column.width ? column.width : '0%' }}
          className="pl-2 pr-2 pb-2 pt-2 "
        >
          {column.accessor(data[index])}
        </div>
      ));
    }

    return (
      <div className="d-flex border-bottom pb-2" style={style}>
        {content}
      </div>
    );
  };

  const changeOrderBy = (column: DataTableColumn<any>) => {
    if (column && column.sortBy) {
      if (fixedSizeListRef && fixedSizeListRef.current) {
        fixedSizeListRef.current.scrollToItem(0);
      }
      if (navigator && navigator.sorts) {
        const sortColumn = navigator.sorts.find(
          sort => column.sortBy && sort && sort.fieldName === column.sortBy.fieldName,
        );
        if (sortColumn) {
          const newSort = { ...sortColumn };
          switch (sortColumn.sortDirection) {
            case SortDirection.Ascending:
              newSort.sortDirection = SortDirection.Descending;
              break;
            case SortDirection.Descending:
              newSort.sortDirection = SortDirection.Ascending;
              break;
            default:
              newSort.sortDirection = SortDirection.Ascending;
          }
          navigator.sortChanged(newSort, ctrlKeyPressed);
        } else {
          navigator.sortChanged(
            { ...column.sortBy, sortDirection: SortDirection.Descending },
            ctrlKeyPressed,
          );
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex mr-3 ">
        {columns.map((column, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={column.sortBy ? () => changeOrderBy(column) : undefined}
            style={{ flexGrow: 1, flexShrink: 1, flexBasis: column.width ? column.width : '0%' }}
            className={`pl-2 pr-2 pb-2 pt-2 border-top border-bottom${
              column.sortBy ? ' cursor-pointer' : ''
            }`}
          >
            <span className="pr-1 mr-1">{column.name}</span>
            <OrderByListener sorts={navigator.sorts} column={column} />
          </div>
        ))}
      </div>

      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={totalItems}
        threshold={1}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className="List"
            height={600}
            itemCount={totalItems}
            itemSize={40}
            itemKey={index => {
              return navigator.getKeyForData(data[index], index);
            }}
            onItemsRendered={onItemsRendered}
            ref={el => {
              fixedSizeListRef.current = el;
              return ref;
            }}
            width="100%"
          >
            {Row}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </>
  );
};
export default DataTableInfinityLoader;

interface OrderByListenerInterface {
  sorts?: Array<PaginationInputSort | undefined | null>;
  column: DataTableColumn<any>;
}
const OrderByListener: FC<OrderByListenerInterface> = ({ sorts, column }) => {
  if (sorts) {
    const sortColumns = sorts.find(
      sort => sort && column && column.sortBy && sort.fieldName === column.sortBy.fieldName,
    );
    if (sortColumns) {
      return (
        <OrderByIndicator
          direction={sortColumns.sortDirection}
          position={sorts.indexOf(sortColumns)}
        />
      );
    }
  }

  return <></>;
};
interface OrderByIndicatorInterface {
  direction: SortDirection | null | undefined;
  position: number;
}
const OrderByIndicator: FC<OrderByIndicatorInterface> = ({ direction, position }) => {
  let result = <></>;
  const pos = (
    <small className="pl-1">
      <sup>{position + 1}</sup>
    </small>
  );
  switch (direction) {
    case SortDirection.Ascending:
      result = (
        <>
          {' '}
          <FontAwesomeIcon icon={faSortUp} />
          {pos}
        </>
      );
      break;
    case SortDirection.Descending:
      result = (
        <>
          {' '}
          <FontAwesomeIcon icon={faSortDown} />
          {pos}
        </>
      );
      break;
    default:
  }
  return <>{result}</>;
};