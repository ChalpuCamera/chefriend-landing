"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackCtaClick, trackLandingLoginLinkClick } from "@/lib/analytics";

export default function LandingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [customUrl, setCustomUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [dragDirection, setDragDirection] = useState<'horizontal' | 'vertical' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      image: "/landing1.png",
      title: "나만의 미니홈피를 만드세요",
      description: "인스타·카톡·배달앱 링크를 한 곳에",
      buttonText: "무료로 시작하기",
    },
    {
      id: 2,
      image: "/landing2.png",
      title: "모든 홍보 링크를 한 곳에서",
      description: "메뉴·영업시간·오시는 길까지, 클릭 한 번으로 안내해요",
      buttonText: "지금 만들어보기",
    },
    {
      id: 3,
      image: "/landing3.png",
      title: "동네맛집의 작은 홈페이지",
      description: "내 가게의 모든 홍보를 한 페이지에 담으세요",
      buttonText: "무료로 제작하기",
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setCurrentTranslate(0);
  };


  // Touch/Mouse event handlers for dragging
  const getPosition = (event: TouchEvent | MouseEvent) => {
    if (event.type.includes("mouse")) {
      return { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };
    } else {
      return {
        x: (event as TouchEvent).touches[0].clientX,
        y: (event as TouchEvent).touches[0].clientY
      };
    }
  };

  const touchStart = (event: React.TouchEvent | React.MouseEvent) => {
    const pos = getPosition(event.nativeEvent as TouchEvent | MouseEvent);
    setStartPos(pos);
    setStartTime(Date.now());
    setDragDirection(null);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const touchMove = (event: React.TouchEvent | React.MouseEvent) => {
    const currentPosition = getPosition(event.nativeEvent as TouchEvent | MouseEvent);
    const diffX = currentPosition.x - startPos.x;
    const diffY = currentPosition.y - startPos.y;

    // 드래그 방향 결정 (첫 움직임 기준)
    if (dragDirection === null && (Math.abs(diffX) > 5 || Math.abs(diffY) > 5)) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setDragDirection('horizontal');
        setIsDragging(true);
      } else {
        setDragDirection('vertical');
        setIsDragging(false);
      }
    }

    // 수평 드래그만 처리
    if (dragDirection === 'horizontal') {
      // 드래그 저항 효과
      const resistance = 0.6;
      const translatedDiff = diffX * resistance;
      setCurrentTranslate(translatedDiff);
    }
  };

  const touchEnd = () => {
    if (dragDirection === 'horizontal' && isDragging) {
      const endTime = Date.now();
      const timeDiff = endTime - startTime;
      const velocity = Math.abs(currentTranslate / timeDiff);

      // 빠른 스와이프 (velocity가 높으면) 또는 충분한 거리 이동
      const threshold = velocity > 0.3 ? 30 : 60;

      // If moved enough negative or fast swipe left, go to next slide (circular)
      if (currentTranslate < -threshold) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
      // If moved enough positive or fast swipe right, go to previous slide (circular)
      else if (currentTranslate > threshold) {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    setIsDragging(false);
    setDragDirection(null);
    setCurrentTranslate(0);

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Prevent body scroll on landing page
  useEffect(() => {
    // body와 html에 overflow hidden 적용
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    // iOS Safari에서 bounce 효과 방지
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      // 컴포넌트 언마운트 시 원래대로 복구
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Prevent passive touch events only for horizontal drag
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleTouchMove = (e: TouchEvent) => {
      // 수평 드래그일 때만 스크롤 방지
      if (dragDirection === 'horizontal' && isDragging) {
        e.preventDefault();
      }
    };

    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, dragDirection]);

  return (
    <div className="relative w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Container - 430px 고정 폭 */}
      <div className="w-full max-w-[430px] h-full mx-auto flex flex-col relative pt-[16px] pb-[40px] px-6">
        {/* Logo Section - 상단 중앙 */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-[170px] h-[38px] relative flex-shrink-0">
            <Image
              src="/logo_big.png"
              alt="셰프랜드 로고"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* iPhone Mockup Section - 중앙 (드래그 가능) */}
        <div
          ref={containerRef}
          className="relative flex-shrink-0 h-[300px] flex items-center justify-center mb-3 cursor-grab active:cursor-grabbing select-none"
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          onMouseDown={touchStart}
          onMouseMove={touchMove}
          onMouseUp={touchEnd}
          onMouseLeave={() => {
            if (isDragging) {
              touchEnd();
            }
          }}
        >
          <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center">
            {/* Current Slide */}
            <div
              className="relative w-[175px] h-[300px]"
              style={{
                transform: `translateX(${currentTranslate}px)`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-contain pointer-events-none select-none"
                priority={currentSlide === 0}
                quality={100}
                draggable={false}
                unoptimized
              />
            </div>

            {/* Next Slide Preview (right side) */}
            {currentTranslate < 0 && (
              <div
                className="absolute top-0 w-[175px] h-[300px] opacity-40"
                style={{
                  left: '50%',
                  marginLeft: '87.5px',
                  transform: `translateX(${80 + currentTranslate}px)`,
                }}
              >
                <Image
                  src={slides[(currentSlide + 1) % slides.length].image}
                  alt="Next slide"
                  fill
                  className="object-contain drop-shadow-2xl pointer-events-none select-none"
                  quality={100}
                  draggable={false}
                  unoptimized
                />
              </div>
            )}

            {/* Previous Slide Preview (left side) */}
            {currentTranslate > 0 && (
              <div
                className="absolute top-0 w-[175px] h-[300px] opacity-40"
                style={{
                  right: '50%',
                  marginRight: '87.5px',
                  transform: `translateX(${-80 + currentTranslate}px)`,
                }}
              >
                <Image
                  src={slides[(currentSlide - 1 + slides.length) % slides.length].image}
                  alt="Previous slide"
                  fill
                  className="object-contain drop-shadow-2xl pointer-events-none select-none"
                  quality={100}
                  draggable={false}
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>

        {/* Dots Indicator - 이미지 바로 아래 */}
        <div className="flex justify-center gap-[6px] mb-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#7c3bc6]"
                  : "bg-[#dee1e6] hover:bg-[#bcc1ca]"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>

        {/* Content Section - 하단 */}
        <div className="flex-1 flex flex-col">
          {/* Title and Description */}
          <div className="text-left mb-3">
            <h2 className="text-[22px] font-bold text-[#171a1f] leading-[32px] mb-1">
              {slides[currentSlide].title}
            </h2>
            <p className="text-[13px] text-[#9095a0] leading-[22px]">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* URL Input */}
          <div className="bg-white border border-[#dee1e6] rounded-lg px-3 py-[8px] flex items-center mb-3">
            <span className="text-[#9095a0] text-[16px] leading-[20px] font-normal">
              chefriend.kr/
            </span>
            <div className="flex-1 ml-0 min-w-0">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder=""
                className="w-full px-1 py-0 outline-none text-[16px] text-[#565d6d] bg-white border-0 leading-[20px]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
            </div>
          </div>

          {/* CTA Button - 슬라이드별로 다른 텍스트 */}
          <Link
            href="/login"
            onClick={() => {
              trackCtaClick(currentSlide + 1, slides[currentSlide].buttonText);
            }}
            className="w-full bg-[#7c3bc6] hover:bg-[#6b32ad] text-white font-bold text-[17px] leading-[26px] py-[10px] rounded-xl transition-colors mb-3 block text-center"
          >
            {slides[currentSlide].buttonText}
          </Link>

          {/* Login Link */}
          <div className="text-center">
            <Link
              href="/login"
              onClick={() => {
                trackLandingLoginLinkClick('landing_page_bottom');
              }}
              className="text-[#171a1f] font-bold text-[16px] leading-[24px] hover:text-[#565d6d] transition-colors inline-block"
              style={{ fontFamily: "'Nunito', 'Noto Sans KR', sans-serif" }}
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
