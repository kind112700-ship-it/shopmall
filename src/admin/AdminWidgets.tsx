// src/components/admin/AdminWidgets.tsx

import React from 'react';

const AdminWidgets: React.FC = () => {
  return (
    <main className="dashboard-widgets">
      {/* 요약 카드 위젯들 */}
      <div className="widget summary-card total-sales">
        <i className="fas fa-won-sign icon"></i>
        <h3>오늘 매출</h3>
        <p>1,250,000원</p>
      </div>
      <div className="widget summary-card new-orders">
        <i className="fas fa-shopping-cart icon"></i>
        <h3>신규 주문</h3>
        <p>15건</p>
      </div>
      <div className="widget summary-card new-users">
        <i className="fas fa-user-plus icon"></i>
        <h3>신규 가입</h3>
        <p>23명</p>
      </div>
      <div className="widget summary-card stock-alerts">
        <i className="fas fa-exclamation-triangle icon"></i>
        <h3>재고 부족</h3>
        <p>5개 상품</p>
      </div>

      {/* 최근 주문 현황 테이블 */}
      <div className="widget full-width-table">
        <h3>최근 주문 현황</h3>
        <table>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>고객명</th>
              <th>총 금액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#20251017-001</td>
              <td>김*희</td>
              <td>45,000원</td>
              <td><span className="status pending">결제 대기</span></td>
            </tr>
            <tr>
              <td>#20251017-002</td>
              <td>이*준</td>
              <td>123,000원</td>
              <td><span className="status shipping">배송 중</span></td>
            </tr>
            <tr>
              <td>#20251017-003</td>
              <td>박*영</td>
              <td>39,000원</td>
              <td><span className="status completed">배송 완료</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminWidgets;