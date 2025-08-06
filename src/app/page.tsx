import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <DashboardLayout />
    </ErrorBoundary>
  );
}
