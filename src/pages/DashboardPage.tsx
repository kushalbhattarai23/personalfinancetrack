import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';
import { BalanceSummary } from '../components/dashboard/BalanceSummary';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { ExpenseByCategory } from '../components/dashboard/ExpenseByCategory';
import { useWalletStore } from '../store/walletStore';
import { useTransactionStore } from '../store/transactionStore';

export const DashboardPage: React.FC = () => {
  const { wallets, fetchWallets } = useWalletStore();
  const { transactions, fetchTransactions } = useTransactionStore();
  
  useEffect(() => {
    fetchWallets();
    fetchTransactions();
  }, [fetchWallets, fetchTransactions]);
  
  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={() => window.location.href = '/wallets/new'}
            className="w-full sm:w-auto"
          >
            New Wallet
          </Button>
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => window.location.href = '/transactions/new'}
            className="w-full sm:w-auto"
          >
            New Transaction
          </Button>
        </div>
      </div>
      
      <BalanceSummary wallets={wallets} transactions={transactions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 md:mt-8">
        <RecentTransactions transactions={transactions} wallets={wallets} />
        <ExpenseByCategory transactions={transactions} />
      </div>
    </MainLayout>
  );
};