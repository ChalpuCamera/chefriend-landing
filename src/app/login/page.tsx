"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { trackKakaoLoginClick, trackLandingBackButtonClick } from "@/lib/analytics";
import { logButtonClick } from "@/lib/api/tracking";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // 페이지 진입 시 body 스크롤 방지
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // iOS Safari에서 bounce 효과 방지
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    // 페이지 이탈 시 원복
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  const handleKakaoLogin = () => {
    // GA4 이벤트 추적 (기존)
    trackKakaoLoginClick('kakao_login_button_click');
    // 백엔드 버튼 로그 추적 (신규)
    logButtonClick('KAKAO_LOGIN');

    // 백엔드 OAuth URL로 리디렉션하여 카카오 로그인 시작
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/authorization/kakao/owner`;
  };

  const handleBackButtonClick = () => {
    trackLandingBackButtonClick('landing_back_button_click');
    router.back();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Container - 430px 고정 폭 */}
      <div className="w-full max-w-[430px] h-full mx-auto flex flex-col relative pt-[16px] pb-[40px] px-6">
        {/* Back Button - 절대 위치 */}
        <button
          onClick={handleBackButtonClick}
          className="absolute left-6 top-[16px] w-8 h-8 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors z-10"
          aria-label="뒤로가기"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="#171A1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

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

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start pt-20">
          {/* Title */}
          <h1 className="text-[30px] font-bold text-[#171a1f] leading-[44px] text-center mb-32">
            링크로 시작하는 가게 홍보
          </h1>

          {/* Subtitle */}
          <p className="text-[17px] text-[#9095a0] leading-[28px] text-center mb-10">
            무료로 회원가입하세요!
          </p>

          {/* Kakao Login Button */}
          <button
            onClick={handleKakaoLogin}
            className="w-full max-w-[343px] h-[52px] bg-[#ffe812] hover:bg-[#fdd835] rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <div className="w-6 h-6 relative">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C6.698 3 2.4 6.318 2.4 10.4C2.4 12.894 3.888 15.094 6.138 16.484L5.172 20.028C5.076 20.346 5.428 20.603 5.702 20.414L10.03 17.61C10.678 17.709 11.338 17.76 12 17.76C17.302 17.76 21.6 14.442 21.6 10.36C21.6 6.278 17.302 2.96 12 2.96V3Z"
                  fill="#3C1E1C"
                />
              </svg>
            </div>
            <span className="text-[17px] font-bold text-[#3c1e1c] leading-[24px]">
              카카오로 로그인하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
