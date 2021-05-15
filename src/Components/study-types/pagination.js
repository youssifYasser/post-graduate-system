import React, { useState } from 'react'
import './study-types.css'

import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md'

const Pagination = ({
  studiesPerPage,
  totalStudies,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalStudies / studiesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    // <nav>
    //   <ul className='pagination'>
    //     {pageNumbers.map((number) => {
    //       return (
    //         <li key={number} className='page-item'>
    //           <a
    //             onClick={() => setCurrentPage(number)}
    //             href='!#'
    //             className='page-link'
    //           >
    //             {number}
    //           </a>
    //         </li>
    //       )
    //     })}
    //   </ul>
    // </nav>
    <ul className='pagination'>
      {currentPage > 1 && (
        <li className='page-item'>
          <a
            href='!#'
            className='page-number'
            onClick={() => {
              setCurrentPage(1)
            }}
          >
            <MdLastPage />
          </a>
        </li>
      )}
      {currentPage > 1 && (
        <li className='page-item'>
          <a
            href='!#'
            onClick={() => {
              setCurrentPage(currentPage - 1)
            }}
          >
            <MdKeyboardArrowRight />
          </a>
        </li>
      )}
      <li className='active-page'>{currentPage}</li>
      {currentPage < pageNumbers.length && (
        <li className='page-item'>
          <a
            href='!#'
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }}
          >
            <MdKeyboardArrowLeft />
          </a>
        </li>
      )}
      {currentPage < pageNumbers.length - 1 && (
        <li className='page-item'>
          <a
            href='!#'
            onClick={() => {
              setCurrentPage(pageNumbers.length)
            }}
          >
            <MdFirstPage />
          </a>
        </li>
      )}
    </ul>
  )
}

export default Pagination
