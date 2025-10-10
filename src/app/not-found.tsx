import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | 셰프랜드",
  description:
    "요청하신 페이지를 찾을 수 없습니다. 홈으로 이동하여 다시 시도해주세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-brand-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            등록된 가게가 없습니다.
          </h2>
          <p className="text-gray-600 mb-8">
            가게의 정확한 링크를 입력해 주세요.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="https://guest.chefriend.kr/home"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>

          <div className="text-sm text-gray-500">
            <p>문제가 지속되면 고객센터로 문의해주세요.</p>
          </div>
          <Link
              href="https://open.kakao.com/o/sCpB58Hh"
              className="text-xs inline-block bg-brand-300 hover:bg-brand-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              문의하기  
            </Link>
        </div>
      </div>
    </div>
  );
}
