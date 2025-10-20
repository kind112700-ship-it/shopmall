// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext'; // ⭐️ CartProvider
import './App.css';

// -----------------------------------------------------------
// 메인 쇼핑몰 레이아웃 컴포넌트
const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const pageContainerStyle = {
    marginLeft: isMenuOpen ? '250px' : '0',
    transition: 'margin-left .5s',
  };

  return (
    <>
      <SidebarMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <div id="page-container" style={pageContainerStyle}>
        
        <Header onMenuOpen={handleOpenMenu} />
        <ImageSlider />
        <ProductGrid />
        <Footer />
        
      </div>
    </>
  );
};
// -----------------------------------------------------------

function App() {
return (
    // ⭐️ CartProvider로 전체 앱을 감싸줍니다. ⭐️
    <CartProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}


export default App;
