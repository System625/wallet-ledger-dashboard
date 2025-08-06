import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import type { DashboardSummary } from '@/lib/types';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(summary.totalBalance),
      change: summary.balanceChange,
    },
    {
      label: 'Total Credits',
      value: formatCurrency(summary.totalCredits),
      change: summary.creditsChange,
    },
    {
      label: 'Total Debits',
      value: formatCurrency(summary.totalDebits),
      change: summary.debitsChange,
    },
    {
      label: 'Transactions',
      value: summary.transactionCount.toString(),
      change: summary.transactionChange,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="shadow-sm border-0 bg-gray-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <p className="text-sm md:text-base text-gray-900 font-medium">{card.label}</p>
              <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5 text-gray-900 cursor-pointer hover:text-gray-900" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs md:text-sm font-medium text-[#3E7383]">
                {formatPercentage(card.change)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}