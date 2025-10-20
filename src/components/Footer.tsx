// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <section className="my-shopping-section">
        <div className="shopping-widget">
          <h2>나의 쇼핑</h2>
          <p>최근 본 상품</p>
          <div className="mini-product">[미니 상품 이미지]</div>
        </div>
      </section>
      <div className="footer">
        <div className="shopping-widget cs-widget">
          <h2>고객센터</h2>
          <p className="phone-number">02-1234-5678</p>
          <p className="time">평일 10:00 ~ 17:00</p>
        </div>
        <p>&copy; 2025 Pastel Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;