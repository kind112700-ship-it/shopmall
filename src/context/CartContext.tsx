import React, { createContext, useContext, useState, ReactNode } from 'react';

// 장바구니 상품의 타입 정의
interface CartItem {
    id: number;
    name: string;
    price: string; // 금액 (문자열)
    quantity: number; 
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    // ⭐️ 장바구니 관리 기능 추가 ⭐️
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Context를 사용하기 위한 커스텀 훅
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart는 CartProvider 내에서 사용되어야 합니다.');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // ⭐️ 수량 변경 함수 구현 ⭐️
    const updateQuantity = (id: number, quantity: number) => {
        setCart(prevCart => 
            prevCart.map(item =>
                // quantity는 최소 1이 되도록 Math.max 사용
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // ⭐️ 상품 삭제 함수 구현 ⭐️
    const removeItem = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return (
        // ⭐️ 추가된 함수들을 value에 포함하여 모든 하위 컴포넌트가 사용할 수 있게 합니다. ⭐️
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};