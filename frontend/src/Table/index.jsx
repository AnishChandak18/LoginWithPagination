import React, { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './helper'
import { Pagination } from './pagination'
import styled from 'styled-components';

const TableStyled = styled.table`
   width: 100%;
   border: 1px solid black;
`;
const ThStyled = styled.th`
   border: 1px solid black;
   padding: 0.5rem;
   span {
      margin-right: 1rem;
    }
`;

const TdStyled = styled.td`
   border: 1px solid black;
   padding: 0.5rem;
`;

const InputStyled = styled.input`
   -webkit-appearance: none;
   border: 1px solid gray;
   padding: 0.5rem;
   width: 100%;
   max-width: 100%;
   background: #f0f0f0;
`;

export const Table = ({ columns, rows }) => {
   const [activePage, setActivePage] = useState(1)
   const [filters, setFilters] = useState({})
   const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
   const rowsPerPage = 10

   const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
   const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
   const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

   const count = filteredRows.length
   const totalPages = Math.ceil(count / rowsPerPage)

   const handleSearch = (value, accessor) => {
      setActivePage(1)

      if (value) {
         setFilters((prevFilters) => ({
            ...prevFilters,
            [accessor]: value,
         }))
      } else {
         setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters }
            delete updatedFilters[accessor]

            return updatedFilters
         })
      }
   }

   const handleSort = (accessor) => {
      setActivePage(1)
      setSort((prevSort) => ({
         order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
         orderBy: accessor,
      }))
   }

   const clearAll = () => {
      setSort({ order: 'asc', orderBy: 'id' })
      setActivePage(1)
      setFilters({})
   }

   return (
      <>
         <TableStyled>
            <thead>
               <tr>
                  {columns.map((column) => {
                     const sortIcon = () => {
                        if (column.accessor === sort.orderBy) {
                           if (sort.order === 'asc') {
                              return '⬆️'
                           }
                           return '⬇️'
                        } else {
                           return '️↕️'
                        }
                     }
                     return (
                        <ThStyled key={column.accessor}>
                           <span>{column.label}</span>
                           <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                        </ThStyled>
                     )
                  })}
               </tr>
               <tr>
                  {columns.map((column) => {
                     return (
                        <ThStyled>
                           <InputStyled
                              key={`${column.accessor}-search`}
                              type="search"
                              placeholder={`Search ${column.label}`}
                              value={filters[column.accessor]}
                              onChange={(event) => handleSearch(event.target.value, column.accessor)}
                           />
                        </ThStyled>
                     )
                  })}
               </tr>
            </thead>
            <tbody>
               {calculatedRows.map((row) => {
                  return (
                     <tr key={row.id}>
                        {columns.map((column) => {
                           if (column.format) {
                              return <TdStyled key={column.accessor}>{column.format(row[column.accessor])}</TdStyled>
                           }
                           return <TdStyled key={column.accessor}>{row[column.accessor]}</TdStyled>
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </TableStyled>

         {count > 0 ? (
            <Pagination
               activePage={activePage}
               count={count}
               rowsPerPage={rowsPerPage}
               totalPages={totalPages}
               setActivePage={setActivePage}
            />
         ) : (
            <p>No data found</p>
         )}

         <div>
            <p>
               <button onClick={clearAll}>Clear all</button>
            </p>
         </div>
      </>
   )
}
