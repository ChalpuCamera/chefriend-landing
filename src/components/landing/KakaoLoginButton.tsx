"use client";

export default function KakaoLoginButton() {
  const handleClick = () => {
    // 목업 버튼 - 실제 로그인 기능 없음
    alert("카카오 로그인 기능은 준비 중입니다.");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 w-full mx-auto px-4 py-2 md:px-5 md:py-2.5 bg-[#FEE500] hover:bg-[#FDD835] transition-colors rounded-lg font-semibold text-sm md:text-base text-[#000000] text-opacity-85 shadow-md hover:shadow-lg"
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3C5.58172 3 2 5.89543 2 9.5C2 11.6615 3.23602 13.5583 5.11451 14.7361L4.30902 17.6902C4.22956 17.9551 4.52315 18.1693 4.75114 18.0116L8.35783 15.6753C8.89498 15.7574 9.44259 15.8 10 15.8C14.4183 15.8 18 12.9046 18 9.3C18 5.69543 14.4183 2.8 10 2.8V3Z"
          fill="#000000"
          fillOpacity="0.85"
        />
      </svg>
      카카오로 시작하기
    </button>
  );
}
