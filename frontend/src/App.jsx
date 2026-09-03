import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import WealthEmiSimulatorPage from './pages/WealthEmiSimulatorPage.jsx';
import PortfolioVaultPage from './pages/PortfolioVaultPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/wealth-backed-emi" element={<WealthEmiSimulatorPage />} />
            <Route path="/portfolio" element={<PortfolioVaultPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
