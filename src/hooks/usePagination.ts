import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialPageSize?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  paginatedData: T[];
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  reset: () => void;
}

export function usePagination<T>({ 
  data, 
  initialPageSize = 10 
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(() => 
    Math.ceil(data.length / pageSize), 
    [data.length, pageSize]
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  const paginatedData = useMemo(() => 
    data.slice(startIndex, endIndex), 
    [data, startIndex, endIndex]
  );

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    // Reset to first page when changing page size
    setCurrentPage(1);
  };

  const reset = () => {
    setCurrentPage(1);
    setPageSizeState(initialPageSize);
  };

  // Reset to first page if current page is invalid after data changes
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    reset,
  };
}