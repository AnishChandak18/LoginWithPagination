import React from 'react'
import styled from 'styled-components'

const PaginationStyled = styled.div`
   margin-top: 0.25rem;
   display: flex;
   justify-content: space-between;
   border: 1px solid black;
   padding: 0.5rem;
`;

export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
   const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
   const end = activePage === totalPages ? count : beginning + rowsPerPage - 1

   return (
      <>
         <PaginationStyled>
            <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
               ⏮️ First
            </button>
            <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
               ⬅️ Previous
            </button>
            <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
               Next ➡️
            </button>
            <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
               Last ⏭️
            </button>
         </PaginationStyled>
         <p>
            Page {activePage} of {totalPages}
         </p>
         <p>
            Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
         </p>
      </>
   )
}
