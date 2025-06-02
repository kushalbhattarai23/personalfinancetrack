import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { DashboardPage } from './pages/DashboardPage';
import { WalletsPage } from './pages/WalletsPage';
import { WalletDetailsPage } from './pages/WalletDetailsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { CalendarPage } from './pages/CalendarPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  const { user, isLoading, getUser } = useAuthStore();
  
  useEffect(() => {
    getUser();
  }, [getUser]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/wallets" element={<WalletsPage />} />
            <Route path="/wallets/:id" element={<WalletDetailsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;