import type { Transaction, DashboardSummary } from './types';

// Base transactions from task.md (must appear first)
const baseTransactions = [
  { remark: 'Salary', amount: 3000, type: 'Credit', date: '2023-10-01' },
  { remark: 'Groceries', amount: -150, type: 'Debit', date: '2023-10-02' },
  { remark: 'Gym Membership', amount: -50, type: 'Debit', date: '2023-10-03' },
  { remark: 'Dinner', amount: -40, type: 'Debit', date: '2023-10-04' },
  { remark: 'Movie Tickets', amount: -30, type: 'Debit', date: '2023-10-05' },
  { remark: 'Rent', amount: -1200, type: 'Debit', date: '2023-10-06' },
  { remark: 'Utilities', amount: -100, type: 'Debit', date: '2023-10-07' },
  { remark: 'Car Payment', amount: -400, type: 'Debit', date: '2023-10-08' },
  { remark: 'Insurance', amount: -200, type: 'Debit', date: '2023-10-09' },
] as const;

// Additional credits to reach $7,890 total (need $4,890 more) - all dated AFTER base transactions
const additionalCredits = [
  { remark: 'Freelance Work', amount: 1200, date: '2023-11-10' },
  { remark: 'Bonus Payment', amount: 800, date: '2023-11-12' },
  { remark: 'Investment Return', amount: 650, date: '2023-11-15' },
  { remark: 'Refund', amount: 320, date: '2023-11-18' },
  { remark: 'Gift Money', amount: 250, date: '2023-11-20' },
  { remark: 'Side Hustle', amount: 400, date: '2023-11-22' },
  { remark: 'Cashback', amount: 80, date: '2023-11-25' },
  { remark: 'Dividend', amount: 150, date: '2023-11-28' },
  { remark: 'Commission', amount: 300, date: '2023-12-01' },
  { remark: 'Consulting Fee', amount: 500, date: '2023-12-03' },
  { remark: 'Part-time Job', amount: 240, date: '2023-12-05' },
];

// Additional debits to reach $4,455 total (need $2,285 more) - all dated AFTER base transactions
const additionalDebits = [
  { remark: 'Coffee', amount: -25, date: '2023-10-11' },
  { remark: 'Lunch', amount: -35, date: '2023-10-12' },
  { remark: 'Gas', amount: -60, date: '2023-10-13' },
  { remark: 'Parking', amount: -15, date: '2023-10-14' },
  { remark: 'Subscription', amount: -12, date: '2023-10-15' },
  { remark: 'Books', amount: -45, date: '2023-10-16' },
  { remark: 'Clothes', amount: -85, date: '2023-10-17' },
  { remark: 'Medical', amount: -120, date: '2023-10-18' },
  { remark: 'Phone Bill', amount: -75, date: '2023-10-19' },
  { remark: 'Internet', amount: -90, date: '2023-10-20' },
  { remark: 'Streaming Service', amount: -15, date: '2023-10-21' },
  { remark: 'ATM Fee', amount: -5, date: '2023-10-22' },
  { remark: 'Bank Fee', amount: -3, date: '2023-10-23' },
  { remark: 'Shopping', amount: -80, date: '2023-10-24' },
  { remark: 'Pharmacy', amount: -25, date: '2023-10-25' },
  { remark: 'Taxi', amount: -20, date: '2023-10-26' },
  { remark: 'Public Transport', amount: -18, date: '2023-10-27' },
  { remark: 'Pet Supplies', amount: -50, date: '2023-10-28' },
  { remark: 'Home Supplies', amount: -30, date: '2023-10-29' },
  { remark: 'Electronics', amount: -200, date: '2023-10-30' },
];

// Generate more transactions to reach exactly 150 total and precise amounts
function generateRemainingTransactions(): Array<{remark: string, amount: number, type: string, date: string}> {
  const remaining = [];
  const currentCredits = 3000 + additionalCredits.reduce((sum, t) => sum + t.amount, 0);
  const currentDebits = 2170 + Math.abs(additionalDebits.reduce((sum, t) => sum + t.amount, 0));
  
  const targetCredits = 7890;
  const targetDebits = 4455;
  
  let creditsNeeded = targetCredits - currentCredits;
  let debitsNeeded = targetDebits - currentDebits;
  
  const dateCounter = 8; // Continue from November 8th
  
  // Add more transactions until we have exactly 150 and hit target amounts
  const currentTransactionCount = 9 + additionalCredits.length + additionalDebits.length;
  const remainingCount = 150 - currentTransactionCount;
  
  for (let i = 0; i < remainingCount; i++) {
    const date = `2024-01-${String(Math.min(dateCounter + i, 31)).padStart(2, '0')}`;
    
    if (creditsNeeded > 0 && (debitsNeeded <= 0 || Math.random() > 0.7)) {
      // Add a credit transaction
      const amount = Math.min(creditsNeeded, Math.floor(Math.random() * 200) + 50);
      remaining.push({
        remark: `Income ${i + 1}`,
        amount,
        type: 'Credit',
        date
      });
      creditsNeeded -= amount;
    } else if (debitsNeeded > 0) {
      // Add a debit transaction
      const amount = Math.min(debitsNeeded, Math.floor(Math.random() * 50) + 10);
      remaining.push({
        remark: `Expense ${i + 1}`,
        amount: -amount,
        type: 'Debit',
        date
      });
      debitsNeeded -= amount;
    } else {
      // Fill remaining with small transactions
      remaining.push({
        remark: `Misc ${i + 1}`,
        amount: -5,
        type: 'Debit',
        date
      });
    }
  }
  
  // Adjust final transaction to hit exact targets if needed
  if (remaining.length > 0) {
    const finalCredits = 3000 + additionalCredits.reduce((sum, t) => sum + t.amount, 0) + 
      remaining.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0);
    const finalDebits = 2170 + Math.abs(additionalDebits.reduce((sum, t) => sum + t.amount, 0)) +
      Math.abs(remaining.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0));
    
    const creditDiff = targetCredits - finalCredits;
    const debitDiff = targetDebits - finalDebits;
    
    if (Math.abs(creditDiff) > 0 && remaining.length > 0) {
      const lastCreditIndex = remaining.findIndex(t => t.type === 'Credit');
      if (lastCreditIndex >= 0) {
        remaining[lastCreditIndex].amount += creditDiff;
      }
    }
    
    if (Math.abs(debitDiff) > 0 && remaining.length > 0) {
      const lastDebitIndex = remaining.findIndex(t => t.type === 'Debit');
      if (lastDebitIndex >= 0) {
        remaining[lastDebitIndex].amount -= debitDiff;
      }
    }
  }
  
  return remaining;
}

const remainingTransactions = generateRemainingTransactions();

// Combine all transactions in the correct order
const allTransactionData = [
  ...baseTransactions,
  ...additionalCredits.map(t => ({ ...t, type: 'Credit' })),
  ...additionalDebits.map(t => ({ ...t, type: 'Debit' })),
  ...remainingTransactions
];

export const transactions: Transaction[] = allTransactionData.map((transaction, index) => ({
  id: (index + 1).toString(),
  date: transaction.date,
  remark: transaction.remark,
  amount: transaction.amount,
  currency: 'USD',
  type: transaction.type as 'Credit' | 'Debit'
}));

// Use exact hardcoded values from task.md - these should NOT be calculated
export const dashboardSummary: DashboardSummary = {
  totalBalance: 12345,
  totalCredits: 7890,
  totalDebits: 4455,
  transactionCount: 150,
  balanceChange: 5,
  creditsChange: 3,
  debitsChange: -2,
  transactionChange: 10,
};