import { useRef } from "react";

import { MOVE_LEFT, MOVE_RIGHT } from "constants/pagination";

const usePagination = ({ totalItems, pageSize, onPageChange }) => {
  const currentPage = useRef(1);
  const pageNeighbours = 2;
  const selectedPageSize = pageSize || 20;
  const totalPages = Math.ceil(totalItems / selectedPageSize);

  const changePageTo = page => {
    currentPage.current = Math.max(0, Math.min(page, totalPages));
    onPageChange({
      limit: selectedPageSize,
      offset: (currentPage.current - 1) * selectedPageSize
    });
  };

  const getPageRange = (from, to, pageStep = 1) => {
    const range = [];

    while (from <= to) {
      range.push(from);
      from += pageStep;
    }
    return range;
  };

  const handleMoveLeft = e => {
    e.preventDefault();
    changePageTo(currentPage.current - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = e => {
    e.preventDefault();
    changePageTo(currentPage.current + pageNeighbours * 2 + 1);
  };

  const handlePageChange = (e, page) => {
    e.preventDefault();
    changePageTo(page);
  };

  const getPageNumbers = () => {
    const totalPageNumbersToShow = pageNeighbours * 2 + 3;
    const totalNumbersWithControls = totalPageNumbersToShow + 2;

    if (totalPages > totalNumbersWithControls) {
      let pages = [];

      const leftBound = currentPage.current - pageNeighbours;
      const rightBound = currentPage.current + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = getPageRange(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalPageNumbersToShow - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = MOVE_LEFT;
      const rightSpillPage = MOVE_RIGHT;

      if (leftSpill && !rightSpill) {
        const extraPages = getPageRange(
          startPage - singleSpillOffset,
          startPage - 1
        );
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = getPageRange(
          endPage + 1,
          endPage + singleSpillOffset
        );
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }
      return [1, ...pages, totalPages];
    }

    return getPageRange(1, totalPages);
  };

  return {
    currentPage: currentPage.current,
    pages: getPageNumbers(),
    handleMoveLeft,
    handleMoveRight,
    handlePageChange
  };
};

export default usePagination;
