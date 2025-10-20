import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/cart.css';
import { useCart } from '../context/CartContext'; // ⭐️ useCart 훅 import

// -----------------------------------------------------
// 유틸리티 함수 및 상수 (다른 파일에서 가져왔다고 가정)
// -----------------------------------------------------
function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const MIN_FREE_SHIPPING = 50000;
const STANDARD_SHIPPING_FEE = 3000;
// -----------------------------------------------------

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    
    // ⭐️ 1. Context에서 모든 데이터와 함수를 가져옵니다. ⭐️
    // CartContext.tsx에 updateQuantity, removeItem이 추가되어야 합니다.
    const { 
        cart: cartItems, 
        // addToCart는 CartPage에서는 사용되지 않지만, Context에 있다고 가정
        // addToCart, 
        // ⭐️ 아래 두 함수가 Context에 구현되어 있어야 합니다. ⭐️
        updateQuantity, 
        removeItem 
    } = useCart(); 

    // 상품 금액 문자열을 숫자로 변환 (예: "39,000원" -> 39000)
    const priceToNumber = (priceString: string): number => {
        return parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
    };

    // ⭐️ 2. 장바구니 요약 계산 (useMemo) ⭐️
    const { subtotal, shippingFee, finalTotal } = useMemo(() => {
        const calculatedSubtotal = cartItems.reduce(
            (sum, item) => sum + priceToNumber(item.price) * item.quantity, 
            0
        );
        
        const calculatedShippingFee = 
            calculatedSubtotal >= MIN_FREE_SHIPPING || calculatedSubtotal === 0
                ? 0
                : STANDARD_SHIPPING_FEE;
        
        const calculatedFinalTotal = calculatedSubtotal + calculatedShippingFee;
        
        return {
            subtotal: calculatedSubtotal,
            shippingFee: calculatedShippingFee,
            finalTotal: calculatedFinalTotal,
        };
    }, [cartItems]);

    // ⭐️ 3. 수량 변경 및 삭제 핸들러를 Context 함수에 연결합니다. ⭐️
    const handleQuantityChange = useCallback((id: number, delta: 1 | -1) => {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            updateQuantity(id, item.quantity + delta);
        }
    }, [cartItems, updateQuantity]);

    const handleRemoveItem = useCallback((id: number) => {
        removeItem(id);
    }, [removeItem]);
    
    const handleCheckout = () => {
        if (subtotal === 0) {
             alert('장바구니에 상품이 없습니다.');
             return;
        }
        navigate('/checkout'); // 주문 페이지로 이동 (가정)
    };


    // ⭐️ 4. 렌더링 부분: Context 데이터를 사용하고 합계 섹션을 포함 ⭐️
    return (
        <div className="cart-container">
            <h1 className="cart-header">나의 장바구니</h1>

            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <div className="empty-cart" style={{textAlign: 'center', padding: '50px', border: '1px dashed #ccc', borderRadius: '5px', color: '#777'}}>
                        장바구니에 담긴 상품이 없습니다.
                    </div>
                ) : (
                    cartItems.map(item => {
                        const unitPriceNumber = priceToNumber(item.price);
                        const itemTotalPrice = unitPriceNumber * item.quantity; // 상품별 총액 계산
                        
                        return (
                            // ⭐️ item의 데이터를 Context에서 가져온 데이터로 사용 ⭐️
                            <div key={item.id} className="cart-item">
                                <div className="product-info">
                                    {/* ⚠️ 임시 이미지: 실제 이미지 URL로 대체해야 합니다. */}
                                    {/* <img 
                                        src={`https://placehold.co/90x90/5d34a4/ffffff?text=${item.name.slice(0, 5)}`} 
                                        alt={item.name} 
                                        className="product-image"
                                    /> */}
                                    <div className="details">
                                        <span className="product-name">{item.name}</span>
                                        <br />
                                        {/* <span className="product-option">{item.price}</span>  */}
                                        <div className="quantity-control">
                                        <button className="quantity-btn minus" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <input type="text" value={item.quantity} className="quantity-input" readOnly />
                                        <button className="quantity-btn plus" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>

                                
                              
                                <div className="price-row">
                                    {/* 단가(필요한 경우) */}
                                    <div className="price">
                                        <span className="unit-price">{item.price}</span> 
                                    </div>
                                    {/* 상품별 총액 */}
                                    <div className="item-total-price">
                                        <span className="total-price-value">{formatNumber(itemTotalPrice)}</span>원
                                    </div>
                                </div>
                                
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>삭제</button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ⭐️ 5. 합계 요약 섹션을 표시합니다. ⭐️ */}
            {cartItems.length > 0 && (
                <div className="cart-summary-wrapper">
                    <div className="cart-summary">
                        <h2 className="text-xl font-semibold mb-3">결제 예상 금액</h2>
                        <div className="summary-line">
                            <span>상품 금액</span>
                            <span className="summary-value product-subtotal font-medium">{formatNumber(subtotal)}원</span>
                        </div>
                        <div className="summary-line">
                            <span>배송비</span>
                            <span className="summary-value shipping-fee font-medium">
                                {shippingFee === 0 ? '무료' : `${formatNumber(shippingFee)}원`}
                            </span>
                        </div>
                        <div className="summary-total">
                            <span>총 결제 금액</span>
                            <span className="summary-value final-total">{formatNumber(finalTotal)}원</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>주문하기</button>
                    </div>
                </div>
            )}
            
            <div className="continue-shopping">
                <Link to="/">계속 쇼핑하기</Link>
            </div>
        </div>
    );
};

export default CartPage;