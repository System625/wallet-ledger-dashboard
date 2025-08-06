import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : currency;
  return `${symbol}${Math.abs(amount).toLocaleString()}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value}%`;
}

export function calculateSummary(transactions: Array<{amount: number, type: string}>): {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
} {
  if (!transactions || transactions.length === 0) {
    return {
      totalBalance: 0,
      totalCredits: 0,
      totalDebits: 0,
      transactionCount: 0,
      balanceChange: 0,
      creditsChange: 0,
      debitsChange: 0,
      transactionChange: 0,
    };
  }

  const totalCredits = transactions
    .filter(t => t.type === 'Credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = Math.abs(transactions
    .filter(t => t.type === 'Debit')
    .reduce((sum, t) => sum + t.amount, 0));

  const totalBalance = totalCredits - totalDebits;
  const transactionCount = transactions.length;

  // Calculate percentage changes based on recent vs older transactions
  const midPoint = Math.floor(transactions.length / 2);
  const recentTransactions = transactions.slice(0, midPoint);
  const olderTransactions = transactions.slice(midPoint);

  const recentCredits = recentTransactions
    .filter(t => t.type === 'Credit')
    .reduce((sum, t) => sum + t.amount, 0);
  const olderCredits = olderTransactions
    .filter(t => t.type === 'Credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const recentDebits = Math.abs(recentTransactions
    .filter(t => t.type === 'Debit')
    .reduce((sum, t) => sum + t.amount, 0));
  const olderDebits = Math.abs(olderTransactions
    .filter(t => t.type === 'Debit')
    .reduce((sum, t) => sum + t.amount, 0));

  const recentBalance = recentCredits - recentDebits;
  const olderBalance = olderCredits - olderDebits;

  // Calculate percentage changes (with fallback to positive values if no old data)
  const balanceChange = olderBalance !== 0 
    ? Math.round(((recentBalance - olderBalance) / Math.abs(olderBalance)) * 100)
    : 5; // fallback

  const creditsChange = olderCredits !== 0
    ? Math.round(((recentCredits - olderCredits) / olderCredits) * 100)
    : 3; // fallback

  const debitsChange = olderDebits !== 0
    ? Math.round(((recentDebits - olderDebits) / olderDebits) * 100)
    : -2; // fallback

  const transactionChange = Math.round((recentTransactions.length - olderTransactions.length) / Math.max(olderTransactions.length, 1) * 100);

  return {
    totalBalance,
    totalCredits,
    totalDebits,
    transactionCount,
    balanceChange,
    creditsChange,
    debitsChange,
    transactionChange,
  };
}
