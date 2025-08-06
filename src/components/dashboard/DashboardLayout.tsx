"use client"

import { useState, useMemo } from 'react';
import Header from './Header';
import SummaryCards from './SummaryCards';
import TransactionTable from './TransactionTable';
import Sidebar from '../sidebar/Sidebar';
import { transactions, dashboardSummary } from '@/lib/data';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Credit' | 'Debit'>('all');
  const [isLoading] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(transaction => 
        transaction.remark.toLowerCase().includes(query) ||
        transaction.type.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query) ||
        transaction.currency.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, typeFilter]);

  // Use the exact hardcoded summary values as specified in task.md to match Figma design

  const SkeletonCard = () => (
    <div className="shadow-sm border-0 bg-gray-200 rounded-lg p-4 md:p-6 animate-pulse">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>
      <div className="space-y-1">
        <div className="h-8 bg-gray-300 rounded w-32"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        {searchQuery || typeFilter !== 'all' 
          ? "Try adjusting your search or filters to find what you're looking for."
          : "No transactions available to display."}
      </p>
      {(searchQuery || typeFilter !== 'all') && (
        <button
          onClick={() => {
            setSearchQuery('');
            setTypeFilter('all');
          }}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={toggleMobileMenu} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="px-4 md:px-6 py-6 md:py-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Summary</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : (
                <SummaryCards summary={dashboardSummary} />
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Transactions</h2>
                {!isLoading && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTypeFilter('all')}
                      className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                        typeFilter === 'all'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All ({transactions.length})
                    </button>
                    <button
                      onClick={() => setTypeFilter('Credit')}
                      className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                        typeFilter === 'Credit'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Credits ({transactions.filter(t => t.type === 'Credit').length})
                    </button>
                    <button
                      onClick={() => setTypeFilter('Debit')}
                      className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                        typeFilter === 'Debit'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Debits ({transactions.filter(t => t.type === 'Debit').length})
                    </button>
                  </div>
                )}
              </div>
              
              {isLoading ? (
                <TableSkeleton />
              ) : filteredTransactions.length === 0 ? (
                <EmptyState />
              ) : (
                <TransactionTable transactions={filteredTransactions} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}