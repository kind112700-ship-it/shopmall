// src/components/admin/AdminTopbar.tsx

import React from 'react';

const AdminTopbar: React.FC = () => {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h1>대시보드</h1>
      </div>
      <div className="topbar-right">
        <p>관리자님, 환영합니다!</p>
        <a href="#" className="profile-icon"><i className="fas fa-user-circle"></i></a>
      </div>
    </header>
  );
};

export default AdminTopbar;