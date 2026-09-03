import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import WealthEmiSimulatorPage from './pages/WealthEmiSimulatorPage.jsx';
import PortfolioVaultPage from './pages/PortfolioVaultPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/wealth-backed-emi" element={<WealthEmiSimulatorPage />} />
          <Route path="/portfolio" element={<PortfolioVaultPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
