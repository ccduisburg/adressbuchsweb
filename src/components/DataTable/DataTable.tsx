import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import { DataTableInterface } from './types';
import DataTableInfinityLoader from './InfinityLoader';
import DataTablePagination from './Pagination';

/* eslint @typescript-eslint/no-explicit-any: "off" */
const DataTable: FC<DataTableInterface> = ({
  showHeader,
  showSuche,
  data,
  columns,
  pagination,
  scrollPagination,
  idColumnName,
}) => {
  if (scrollPagination) {
    return (
      <DataTableInfinityLoader columns={columns} data={data || []} navigator={scrollPagination} />
    );
  }

  let header = (
    <thead>
      {columns.map(col => (
        <td key={col.name}>{col.name}</td>        
      ))}
    </thead>
    
  );
    
 

  
  if (!showHeader) {
    header = <></>;
  }
   

  let paginationComponent = <></>;
  if (pagination) {
    paginationComponent = (
      <DataTablePagination
        setPage={pagination.setPage}
        previosPage={pagination.previosPage}
        nextPage={pagination.nextPage}
        firstPage={pagination.firstPage}
        lastPage={pagination.lastPage}
        first={pagination.first}
        pageSize={pagination.pageSize}
        totalPages={pagination.totalPages}
        recordCount={pagination.recordCount}
      />
    );
  }
  return (
    <>
      {paginationComponent}
      <Table className="table" hover bordered>
        {header}       
        <tbody>
          {data
            ? data.map(entry => (
                <tr key={entry[idColumnName]}>
                  {columns.map((column, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={index}>{column.accessor(entry)}</td>
                  ))}
                </tr>
              ))
            : ''}
        </tbody>
      </Table>
    </>
  );
};
export default DataTable;