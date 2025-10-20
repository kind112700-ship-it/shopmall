// src/components/ImageSlider.tsx
import React, { useEffect } from 'react';
import { useSlider } from '../useSlider';

const slidesData = [
    { img: "./shopping-mall-1.jpg", title: "✨ NEW 시즌 파스텔 컬렉션 20% 할인 ✨" },
    { img: "./shopping-mall-2.jpg", title: "🎁 첫 구매 고객 전용 사은품 증정!" },
    { img: "./shopping-mall-3.jpg", title: "🌈 여름 한정! 액세서리 30% 특가!" },
];

const ImageSlider: React.FC = () => {
    const slideCount = slidesData.length;
    
    // 슬라이더 로직 Custom Hook 사용
    const { sliderRef, currentSlideIndex, handleArrowClick, handleDotClick } = useSlider({ slideCount, autoSlideInterval: 3000 });

    // ⭐️ jQuery/useEffect로 DOM 조작하는 방식 대신 React 렌더링으로 변경 ⭐️
    // 이제 useSlider 훅 내부에서 DOM 복제 코드를 제거해야 합니다.

    return (
        <section className="full-width-slider-section">
            <div className="slider-container" ref={sliderRef}>
                {/* 원본 슬라이드 (1, 2, 3) */}
                {slidesData.map((slide, index) => (
                    <div className="slide" key={index}>
                        <a href="#">
                            <h2>{slide.title}</h2>
                        </a>
                        <img src={slide.img} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
                
                {/* ⭐️ 복제본 슬라이드 추가 (무한 루프의 4번째 슬라이드 역할) ⭐️ */}
                <div className="slide clone" key="clone-0">
                    <a href="#">
                        <h2>{slidesData[0].title}</h2>
                    </a>
                    <img src={slidesData[0].img} alt="Slide Clone 1" />
                </div>

            </div>

            {/* 화살표 버튼 */}
            <button className="slider-arrow left-arrow" onClick={() => handleArrowClick('prev')}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider-arrow right-arrow" onClick={() => handleArrowClick('next')}>
                <i className="fas fa-chevron-right"></i>
            </button>

            {/* 점 인디케이터 */}
            <div className="slider-dots">
                {slidesData.map((_, index) => (
                    <span 
                        key={index}
                        className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default ImageSlider;