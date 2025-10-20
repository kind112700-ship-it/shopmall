// src/pages/AdminDashboard.tsx

import React from 'react';
import AdminSidebar from '../admin/AdiminSidebar';
import AdminTopbar from '../admin/AdminTopbar';
import AdminWidgets from '../admin/AdminWidgets';
import '../css/adimin.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-wrapper">
      {/* 1. 좌측 메뉴 */}
      <AdminSidebar />
      
      <div className="admin-main-content">
        {/* 2. 상단 헤더 */}
        <AdminTopbar />
        
        {/* 3. 메인 콘텐츠 / 위젯 */}
        <AdminWidgets />
      </div>
    </div>
  );
};

export default AdminDashboard;