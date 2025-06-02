import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Transaction, TRANSACTION_TYPES, Wallet } from '../../types';

interface TransactionFormProps {
  transaction?: Transaction;
  wallets: Wallet[];
  selectedWalletId?: string;
  onSubmit: (data: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => void;
  isLoading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  wallets,
  selectedWalletId,
  onSubmit,
  isLoading,
}) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const [date, setDate] = useState(today);
  const [type, setType] = useState<string>(TRANSACTION_TYPES[0]);
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [reason, setReason] = useState('');
  const [walletId, setWalletId] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (transaction) {
      setDate(transaction.date);
      setType(transaction.type);
      setIncome(transaction.income ? transaction.income.toString() : '');
      setExpense(transaction.expense ? transaction.expense.toString() : '');
      setReason(transaction.reason);
      setWalletId(transaction.wallet_id);
    }
  }, [transaction]);
  
  useEffect(() => {
    if (selectedWalletId) {
      setWalletId(selectedWalletId);
    } else if (wallets.length === 1) {
      // If there's only one wallet, select it by default
      setWalletId(wallets[0].id);
    }
  }, [selectedWalletId, wallets]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!walletId) {
      setError('Please select a wallet');
      return;
    }
    
    onSubmit({
      date,
      type: type as any,
      income: income ? parseFloat(income) : undefined,
      expense: expense ? parseFloat(expense) : undefined,
      reason,
      wallet_id: walletId,
    });
  };
  
  const typeOptions = TRANSACTION_TYPES.map(type => ({
    value: type,
    label: type,
  }));
  
  const walletOptions = wallets.map(wallet => ({
    value: wallet.id,
    label: wallet.name,
  }));
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        leftIcon={<Calendar size={18} />}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Income Amount (Optional)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          leftIcon={<DollarSign size={18} className="text-emerald-500" />}
        />
        
        <Input
          label="Expense Amount (Optional)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          leftIcon={<DollarSign size={18} className="text-red-500" />}
        />
      </div>
      
      <Select
        label="Transaction Type"
        options={typeOptions}
        value={type}
        onChange={setType}
        required
      />
      
      <Input
        label="Reason / Description"
        placeholder="What's this transaction for?"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
        leftIcon={<FileText size={18} />}
      />
      
      <Select
        label="Wallet"
        options={walletOptions}
        value={walletId}
        onChange={setWalletId}
        required
        error={error}
      />
      
      <Button type="submit" isLoading={isLoading} className="w-full mt-6">
        {transaction ? 'Update Transaction' : 'Create Transaction'}
      </Button>
    </form>
  );
};