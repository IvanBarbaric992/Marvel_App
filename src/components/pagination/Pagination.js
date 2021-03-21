import React from "react";

import usePagination from "hooks/usePagination";

import { MOVE_LEFT, MOVE_RIGHT } from "constants/pagination";

import "./Pagination.scss";

const PaginationComponent = ({ numberOfRecords, pageSize, onPageChange }) => {
  const {
    pages,
    currentPage,
    handleMoveLeft,
    handleMoveRight,
    handlePageChange
  } = usePagination({
    totalItems: numberOfRecords,
    pageSize,
    surroundingPages: 1,
    onPageChange
  });

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {pages.map((page, index) => {
          if (page === MOVE_LEFT)
            return (
              <li key={index} className="pagination__list__page--item">
                <button
                  className="pagination__list__page--link"
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>
            );

          if (page === MOVE_RIGHT)
            return (
              <li key={index} className="pagination__list__page--item">
                <button
                  className="pagination__list__page--link"
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            );

          return (
            <li
              key={index}
              className={`pagination__list__page--item${
                page === currentPage ? " active" : ""
              }`}
            >
              <button
                disabled={page === currentPage}
                className="pagination__list__page--link"
                href="#"
                value={page}
                onClick={e => handlePageChange(e, page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
