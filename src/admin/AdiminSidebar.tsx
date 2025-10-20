// src/admin/AdminSidebar.tsx

import React from 'react';

// Font Awesome 아이콘을 사용합니다.
// (public/index.html에 CDN이 로드되어 있다고 가정합니다.)

const AdminSidebar: React.FC = () => {
  return (
    <nav className="admin-sidebar">
      <div className="admin-logo">
        <h2>Admin Dashboard</h2>
      </div>
      <ul className="admin-menu">
        <li className="active"><a href="#"><i className="fas fa-tachometer-alt"></i> 대시보드</a></li>
        <li><a href="#"><i className="fas fa-box-open"></i> 상품 관리</a></li>
        <li><a href="#"><i className="fas fa-truck"></i> 주문 관리</a></li>
        <li><a href="#"><i className="fas fa-users"></i> 고객 관리</a></li>
        <li><a href="#"><i className="fas fa-chart-line"></i> 통계 분석</a></li>
        <li className="logout"><a href="index.html"><i className="fas fa-sign-out-alt"></i> 로그아웃</a></li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;