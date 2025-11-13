"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  trackLandingCtaClick,
  trackLandingLoginLinkClick,
} from "@/lib/analytics";
import { logButtonClick } from "@/lib/api/tracking";

export default function LandingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [customUrl, setCustomUrl] = useState("");
  // 드래그 기능 비활성화 - 주석 처리됨
  // const [isDragging, setIsDragging] = useState(false);
  // const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  // const [currentTranslate, setCurrentTranslate] = useState(0);
  // const [startTime, setStartTime] = useState(0);
  // const [dragDirection, setDragDirection] = useState<'horizontal' | 'vertical' | null>(null);
  // const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      image: "/landing1.png",
      title: "인스타에 어떤 링크 올릴 지 고민하지 마세요!",
      description:
        "배달·지도·문의 링크를 한 페이지에 모아 한 링크로 보여줍니다",
      buttonText: "무료로 시작하기",
    },
    {
      id: 2,
      image: "/landing2.png",
      title: "배민을 올릴지 쿠팡이츠를 올릴지 매번 고민되시죠",
      description: "둘 다 넣어두면 손님이 자기한테 맞는 앱을 선택해 들어갑니다",
      buttonText: "지금 만들어보기",
    },
    {
      id: 3,
      image: "/landing3.png",
      title: "손님이 “맛있다”만 쓰고 가서 어디를 고쳐야 할지 모르시죠?",
      description:
        "메뉴별로 맛·양·가격 으로 리뷰를 나눠 받아 바로 개선 포인트를 볼 수 있습니다",
      buttonText: "무료로 제작하기",
    },
    {
      id: 4,
      image: "/landing2.png",
      title: "메뉴는 새로 냈는데 ‘맛이 어떤지’ 말해줄 손님이 안 모이죠?",
      description: "새 메뉴에 리워드를 걸어 고객이 한 번은 먹어보게 만듭니다",
      buttonText: "무료로 제작하기",
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // setCurrentTranslate(0); // 드래그 기능 비활성화로 주석 처리
  };

  /* ===== 드래그 기능 비활성화 - 주석 처리됨 =====
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
  ===== 드래그 기능 주석 처리 끝 ===== */

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
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // iOS Safari에서 bounce 효과 방지
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    return () => {
      // 컴포넌트 언마운트 시 원래대로 복구
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  /* ===== 드래그 터치 이벤트 리스너 비활성화 - 주석 처리됨 =====
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
  ===== 드래그 터치 이벤트 주석 처리 끝 ===== */

  return (
    <div className="relative w-full h-screen bg-white flex flex-col overflow-hidden">
      {/* Container - 430px 고정 폭 */}
      <div className="w-full max-w-[430px] h-full mx-auto flex flex-col relative pt-[16px] pb-[40px] px-6">
        <div className="flex items-center justify-between mb-3">
          {/* Logo Section - 왼쪽 */}
          <div className="w-[170px] h-[38px] relative flex-shrink-0">
            <Image
              src="/logo_big.png"
              alt="셰프랜드 로고"
              fill
              className="object-contain"
            />
          </div>
          {/* Login Link - 오른쪽 */}
          <Link
            href="/login"
            onClick={() => {
              trackLandingLoginLinkClick("landing_login_link_click");
              logButtonClick("LOGIN");
            }}
            aria-label="로그인 페이지로 이동"
            className="text-[#171a1f] font-bold text-[16px] leading-[24px] hover:text-[#565d6d] transition-colors p-2 -m-2"
          >
            로그인
          </Link>
        </div>

        {/* iPhone Mockup Section - 중앙 (드래그 기능 비활성화) */}
        {/* 드래그 이벤트 핸들러 모두 제거됨: ref, onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave */}
        <div className="relative flex-shrink-0 h-[300px] flex items-center justify-center mb-3 select-none">
          <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center">
            {/* Current Slide */}
            {/* 드래그 애니메이션 제거됨: style={{ transform, transition, willChange }} */}
            <div className="relative w-[175px] h-[300px]">
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

            {/* ===== 좌우 슬라이드 프리뷰 비활성화 - 주석 처리됨 =====
            Next Slide Preview (right side)
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

            Previous Slide Preview (left side)
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
            ===== 좌우 슬라이드 프리뷰 주석 처리 끝 ===== */}
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
            <h2 className="text-[21px] font-bold text-[#171a1f] leading-[32px] mb-1">
              {slides[currentSlide].title}
            </h2>
            <p className="text-[16px] text-[#9095a0] leading-[22px]">
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
              />
            </div>
          </div>

          {/* CTA Button - 슬라이드별로 다른 텍스트 */}
          <Link
            href="/login"
            onClick={() => {
              trackLandingCtaClick("landing_cta_click");
              logButtonClick("START_FREE");
            }}
            className="w-full bg-[#7c3bc6] hover:bg-[#6b32ad] text-white font-bold text-[17px] leading-[26px] py-[10px] rounded-xl transition-colors mb-3 block text-center"
          >
            {slides[currentSlide].buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
