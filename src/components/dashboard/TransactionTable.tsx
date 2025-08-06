'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { formatDate, formatCurrency } from '@/lib/utils';
import { usePagination } from '@/hooks/usePagination';
import type { Transaction } from '@/lib/types';

interface TransactionTableProps {
  transactions: Transaction[];
}

type SortDirection = 'asc' | 'desc';
type SortColumn = 'date' | 'remark' | 'amount' | 'currency' | 'type';

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0;
    
    switch (sortColumn) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'remark':
        comparison = a.remark.localeCompare(b.remark);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'currency':
        comparison = a.currency.localeCompare(b.currency);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
  } = usePagination({
    data: sortedTransactions,
    initialPageSize: 10,
  });

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      );
    }
    
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 transition-transform ${
          sortDirection === 'asc' ? 'rotate-180' : ''
        } text-gray-600`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="overflow-x-auto">
        <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow className="border-b-0">
            <TableHead
              className="cursor-pointer hover:bg-gray-50 text-gray-500 font-medium py-3 w-[80%]"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center gap-1 border-b-2 pb-1 md:pb-2 w-[97%]">
                <span className="text-xs md:text-sm">Date</span>
                {getSortIcon('date')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-500 font-medium py-2 md:py-3 w-[60%]"
              onClick={() => handleSort('remark')}
            >
              <div className="flex items-center gap-1 border-b-2 pb-1 md:pb-2 w-[91%]">
                <span className="text-xs md:text-sm">Remark</span>
                {getSortIcon('remark')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-500 font-medium py-2 md:py-3 w-[15%]"
              onClick={() => handleSort('amount')}
            >
              <div className="flex items-center gap-1 border-b-2 pb-1 md:pb-2 w-[90%]">
                <span className="text-xs md:text-sm">Amount</span>
                {getSortIcon('amount')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-500 font-medium py-2 md:py-3 w-[12.5%]"
              onClick={() => handleSort('currency')}
            >
              <div className="flex items-center gap-1 border-b-2 pb-1 md:pb-2 w-[90%]">
                <span className="text-xs md:text-sm">Currency</span>
                {getSortIcon('currency')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50 text-gray-500 font-medium py-2 md:py-3 w-[12.5%]"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center gap-1 border-b-2 pb-1 md:pb-2 w-[90%]">
                <span className="text-xs md:text-sm">Type</span>
                {getSortIcon('type')}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((transaction) => (
            <TableRow key={transaction.id} className="border-b-0 hover:bg-gray-50">
              <TableCell className="py-3 text-gray-900 w-[70%]">
                <div className="border-b-2 border-gray-200 pb-2 w-[97%]">
                  {formatDate(transaction.date)}
                </div>
              </TableCell>
              <TableCell className="py-3 text-gray-900 w-[10%]">
                <div className="border-b-2 border-gray-200 pb-2 w-[90%]">
                  {transaction.remark}
                </div>
              </TableCell>
              <TableCell className="py-3 text-gray-900 font-medium w-[10%]">
                <div className="border-b-2 border-gray-200 pb-2 w-[85%]">
                  {transaction.amount >= 0 ? '' : '-'}
                  {formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                </div>
              </TableCell>
              <TableCell className="py-3 text-gray-900 w-[10%]">
                <div className="border-b-2 border-gray-200 pb-2 w-[85%]">
                  {transaction.currency}
                </div>
              </TableCell>
              <TableCell className="py-3 w-[10%]">
                <div className="border-b-2 border-gray-200 pb-1 w-[90%]">
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-full">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: transaction.type === 'Credit' ? 'green' : 'red' }}
                    ></div>
                    <span className="text-gray-900 text-xs font-medium">{transaction.type}</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{endIndex} of {transactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={prevPage}
                  className={!hasPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }

                if (pageNum === currentPage - 2 && currentPage > 4 && totalPages > 7) {
                  return (
                    <PaginationItem key={`ellipsis-start`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                if (pageNum === currentPage + 2 && currentPage < totalPages - 3 && totalPages > 7) {
                  return (
                    <PaginationItem key={`ellipsis-end`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => goToPage(pageNum)}
                      isActive={pageNum === currentPage}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext 
                  onClick={nextPage}
                  className={!hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}