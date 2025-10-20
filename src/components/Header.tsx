// src/components/Header.tsx
import React, { useRef,useMemo } from 'react';
import { useScrollFixed } from '../useSlider';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface HeaderProps {
    onMenuOpen: () => void;
}

const categories = ["NEW ARRIVAL", "BEST", "TOP", "BOTTOM", "ACC", "SALE"];

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
    const categoryNavRef = useRef<HTMLElement>(null);
    useScrollFixed(categoryNavRef, 'fixed'); // 스크롤 시 'fixed' 클래스 적용

    // ⭐️ 1. useCart 훅을 사용하여 장바구니 아이템을 가져옵니다. ⭐️
    const { cart: cartItems } = useCart();

    // ⭐️ 2. useMemo를 사용하여 장바구니의 총 수량을 계산합니다. ⭐️
    const totalQuantity = useMemo(() => {
        // cartItems 배열의 모든 quantity를 합산합니다.
        // item.quantity는 CartContext에서 정의된 숫자입니다.
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    return (
        <>
            {/* Top Announcement Bar */}
            <div className="top-announcement-bar">
                <a href="#">
                    <p> 🎁5만원 이상 구매 시 10% 쿠폰 즉시 지급!🎁 </p>
                </a>
            </div>

            {/* Utility Bar */}
            <header className="utility-bar">
                <nav className="nav-left-utility">
                    <button className="hamburger-btn" onClick={onMenuOpen}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link to="/admin" className="nav-link admin-link-desktop utility-item">[관리자]</Link>          
                    <Link to="/login" className="nav-link utility-item"><i className="fas fa-user"></i> 로그인</Link>
                    <Link to="/cart" className="nav-link cart-link utility-item">
                        <i className="fas fa-shopping-cart"></i>
                        {/* ⭐️ 3. 계산된 totalQuantity로 장바구니 카운트를 업데이트합니다. ⭐️ */}
                        <span className="cart-count">{totalQuantity}</span> 
                    </Link>
                </nav>

                <div className="search-bar-container utility-item">
                    <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
                    <button className="search-btn"><i className="fas fa-search"></i></button>
                </div>

                <div className="nav-right-spacer"></div>
            </header>
            
            {/* Logo Bar */}
            <div className="logo-bar">
                <h1 className="logo"><a href="#">Pastel Shop</a></h1>
            </div>

            {/* Full Width Category Navigation (Fixed on Scroll) */}
            <nav className="full-width-category-nav" ref={categoryNavRef}>
                <ul>
                    {categories.map(category => (
                        <li key={category}><a href="#">{category}</a></li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Header;