import CtaButton from "@/components/landing/CtaButton";
import ProcessDiagram from "@/components/landing/ProcessDiagram";

const Header = () => {
  return (
    <header className="text-black">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex justify-center items-center">
          <div className="text-center md:text-center space-y-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in space-y-4">
              <div className="text-2xl md:text-3xl mb-4 text-gray-700">
                매출 걱정 없이
              </div>
              <div className="text-3xl md:text-5xl text-brand-500">
                솔직한 피드백 받고, <br />데이터로 매출 늘리세요
              </div>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-slide-up">
              <span className="text-2xl md:text-2xl font-bold text-gray-800">
                선주문 확정 매출 + <br /><span className="text-red-500">비공개</span>{" "}
                안전 피드백으로
              </span>
              <br />
              <span className="text-base md:text-lg mt-4 block text-gray-600">
                평균 30일 내 재방문률 25% 증가
              </span>
            </p>
            {/* 프로모션 안내 */}
            <div className="mt-6 mb-4">
              <p className="text-2xl font-semibold text-brand-600">
                ✨ 프로모션 기간 동안 전부 무료로 사용해 보실 수 있습니다
              </p>
            </div>

            <CtaButton />
            <ProcessDiagram />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
