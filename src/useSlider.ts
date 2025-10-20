import { useState, useEffect, useRef, useCallback } from 'react';
// import $ from 'jquery'; // ⭐️ jQuery 의존성을 제거하고 네이티브 DOM / React 방식을 사용합니다. ⭐️

// ⭐️ UseSliderProps 인터페이스 정의
interface UseSliderProps {
    slideCount: number;
    autoSlideInterval: number; // ms
}

export const useSlider = ({ slideCount, autoSlideInterval = 3000 }: UseSliderProps) => {
    // slideCount는 원본 슬라이드 개수 (3), DOM의 총 슬라이드 개수는 (4)
    const totalSlidesInDOM = slideCount + 1; 
    const slidePercentage = 100 / totalSlidesInDOM; // 개별 슬라이드의 너비 (25%)

    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null); 
    
    // 슬라이드 이동 함수 (CSS Transition 방식으로 전면 수정)
    const moveSlide = useCallback((index: number) => {
        const slider = sliderRef.current;
        if (!slider) return;
        
        const targetIndex = index;
        const transitionDuration = 600; // ms (기존 jQuery animate 시간과 동일)

        // 1. 기본 transition 적용
        slider.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
        
        // 2. 위치 이동: 개별 슬라이드 너비만큼 이동합니다.
        // ⭐️⭐️ 수정 핵심: -targetIndex * 100% 대신 -targetIndex * 25% (slidePercentage) ⭐️⭐️
        slider.style.transform = `translateX(-${targetIndex * slidePercentage}%)`;
        
        // 3. ⭐️⭐️ 무한 루프 처리: 복제본(index === slideCount)에 도달했을 때 (공백 제거 로직) ⭐️⭐️
        if (targetIndex === slideCount) {
            // 애니메이션 완료를 기다린 후 순간 이동 실행
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0%)`; // 0번 슬라이드 위치로 리셋

                setCurrentIndex(0); 

                // 다음 이동을 위해 transition 복구
                setTimeout(() => {
                    slider.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
                }, 50);

            }, transitionDuration); 
        } 
        else if (targetIndex < 0) {
             // prev 화살표 클릭에서 순간 이동 처리 후 상태만 업데이트
             setCurrentIndex(slideCount - 1);
        }
        else {
            setCurrentIndex(targetIndex);
        }

    }, [slideCount]);


    // 화살표 클릭 핸들러 (CSS Transition 로직에 맞게 재작성)
    const handleArrowClick = useCallback((direction: 'next' | 'prev') => {
        let nextIndex;
        const slider = sliderRef.current;
        if (!slider) return;
        
        if (direction === 'next') {
            // 마지막 원본(2)이면 -> 복제본(3)으로 이동
            nextIndex = currentIndex === slideCount - 1 ? slideCount : currentIndex + 1;
        } else { // prev
            if (currentIndex === 0) {
                // 1. transition 제거 (순간 이동을 위해)
                slider.style.transition = 'none';
                
                // 2. 위치를 복제본 바로 앞(마지막 원본) 위치로 순간 이동 (애니메이션 없음)
                // (슬라이드 3개 너비만큼 이동)
                slider.style.transform = `translateX(-${slideCount * slidePercentage}%)`; 
                
                // 3. 인덱스 상태만 복제본(slideCount)으로 설정
                setCurrentIndex(slideCount); 
                
                // 4. transition 복구
                setTimeout(() => {
                    slider.style.transition = `transform 0.6s ease-in-out`;
                }, 50);

                // 5. 다음 애니메이션 타겟을 마지막 원본(2)으로 설정
                nextIndex = slideCount - 1; 
                
                // 6. 순간 이동만 했으므로, 다음 애니메이션 (마지막 원본으로 이동)을 시작
                moveSlide(nextIndex);
                return; 
            } else {
                nextIndex = currentIndex - 1;
            }
        }
        
        moveSlide(nextIndex);
    }, [currentIndex, slideCount, moveSlide, slidePercentage]);


    // 점(Dot) 클릭 핸들러
    const handleDotClick = useCallback((dotIndex: number) => {
        moveSlide(dotIndex);
    }, [moveSlide]);


    // 자동 슬라이드 로직
    useEffect(() => {
        const interval = setInterval(() => {
            moveSlide(currentIndex === slideCount - 1 ? slideCount : currentIndex + 1);
        }, autoSlideInterval);
        
        return () => clearInterval(interval);
    }, [currentIndex, slideCount, autoSlideInterval, moveSlide]);


    return {
        sliderRef,
        currentSlideIndex: currentIndex % slideCount, // 닷 인디케이터용 실제 인덱스 (0, 1, 2)
        handleArrowClick,
        handleDotClick,
        moveSlide 
    };
};

// ⭐️ useScrollFixed 훅 정의 (이전 코드 유지)
export const useScrollFixed = (ref: React.RefObject<HTMLElement | null>, className: string = 'fixed') => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return; 

        const scrollTrigger = element.offsetTop;
        
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const shouldFix = currentScroll >= scrollTrigger;

            element.classList.toggle(className, shouldFix);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref, className]);
}