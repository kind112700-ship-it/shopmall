// src/components/SidebarMenu.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
    // 1. Context에서 장바구니 아이템을 가져옵니다.
    const { cart: cartItems } = useCart();

    // 2. useMemo로 총 수량을 계산합니다.
    const totalQuantity = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    return (
        <div 
            className="sidebar-menu" 
            style={{ 
                width: isOpen ? '250px' : '0',
                // 닫혔을 때 뒤쪽 요소 클릭 방해 방지
                pointerEvents: isOpen ? 'auto' : 'none', 
            }}
        >
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="menu-header">
                <p>
                    <Link to="/login" className="nav-link" onClick={onClose}>
                        로그인 / 회원가입
                    </Link>
                </p>
                <p>
                    <Link to="/cart" className="nav-link" onClick={onClose}>
                        장바구니 ({totalQuantity}) 
                        {/* ⭐️ 계산된 수량(totalQuantity)을 표시합니다. ⭐️ */}
                    </Link>
                </p>
                <p>
                    <Link to="/admin" className="nav-link" onClick={onClose}>
                        [관리자 모드]
                    </Link>
                </p>
            </div>
            <ul className="main-menu-vertical">
                <li><a href="#">NEW ARRIVAL</a></li>
                <li><a href="#">BEST</a></li>
                <li><a href="#">TOP</a></li>
                <li><a href="#">BOTTOM</a></li>
                <li><a href="#">ACC</a></li>
                <li><a href="#">SALE</a></li>
            </ul>
            <div className="menu-footer">
                <a href="#">고객센터</a>
                <a href="#">공지사항</a>
            </div>
        </div>
    );
};

export default SidebarMenu;