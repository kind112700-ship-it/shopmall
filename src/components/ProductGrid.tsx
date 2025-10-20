import React from 'react';
import { useCart } from '../context/CartContext'; // ⭐️ useCart 훅 import

// 상품 타입 정의 (Context와 맞춰 id 추가)
interface Product {
    id: number; // ⭐️ 고유 ID 추가
    name: string;
    price: string;
}

// ⭐️ products 데이터에 고유 ID 할당
const products: Product[] = [
    { id: 1, name: "파스텔 니트", price: "39,000원" },
    { id: 2, name: "세련된 셔츠", price: "54,000원" },
    { id: 3, name: "기본 티셔츠", price: "22,000원" },
    { id: 4, name: "트렌치 코트", price: "99,000원" },
    { id: 5, name: "스커트", price: "45,000원" },
    { id: 6, name: "원피스", price: "68,000원" },
    { id: 7, name: "스커트", price: "45,000원" },
    { id: 8, name: "원피스", price: "68,000원" },
];

const ProductCard: React.FC<Product> = (product) => {
    // ⭐️ 페이지 이동(useNavigate) 대신 addToCart 함수 사용
    const { addToCart } = useCart(); 

    const handlePurchase = () => {
        // ⭐️ 페이지 이동 없이, 상품 데이터를 Context의 상태에 추가합니다.
        addToCart(product);
        console.log(`${product.name} (ID: ${product.id}) 상품이 장바구니에 담겼습니다.`);
        alert(`${product.name} 상품이 장바구니에 담겼습니다!`);
    };

    return (
        <div className="product-card">
            <div className="product-image">[상품 이미지]</div>
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
            {/* ⭐️ 버튼 클릭 시 addToCart 호출 */}
            <button className="cta-button" onClick={handlePurchase}>
                구매하기
            </button>
        </div>
    );
};

const ProductGrid: React.FC = () => {
    return (
        <main className="main-content-full">
            <h2 style={{ marginTop: '50px' }}>오늘의 추천 상품</h2>
            <div className="product-grid">
                {products.map((product) => (
                    // map 내부에서는 id를 key로 사용
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </main>
    );
};

export default ProductGrid;