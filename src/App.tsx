import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginForm from './components/Auth/LoginForm';
import LandingPage from './components/Home/LandingPage';
import SearchPage from './components/Search/SearchPage';
import SellerDashboard from './components/Seller/SellerDashboard';
import MarketData from './components/Market/MarketData';
import ProfilePage from './components/Profile/ProfilePage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'search':
        return <SearchPage />;
      case 'seller':
        return <SellerDashboard />;
      case 'market':
        return <MarketData />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      {renderView()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
