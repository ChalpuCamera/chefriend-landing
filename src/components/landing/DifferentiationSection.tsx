import { ArrowRight } from "lucide-react";
import Image from "next/image";

const differentiations = [
  {
    category: "vs 배달앱 리뷰",
    before: "맛있어요",
    after: "염도 10% 줄이세요",
    description: "형식적 리뷰 → 구체적 개선점",
  },
  {
    category: "vs 공개 리뷰",
    before: "매출 타격 위험",
    after: "비공개로 안전",
    description: "공개 리뷰로 매출 타격 → 비공개로 안전한 개선",
  },
  {
    category: "vs 무료 샘플",
    before: "피드백 위해 손실",
    after: "선주문으로 매출",
    description: "무료 샘플 제공 → 선주문으로 확정 매출",
  },
  {
    category: "vs 주관적 의견",
    before: "감정 표현만",
    after: "데이터 분석",
    description: "주관적 감정 → 데이터 기반 객관적 분석",
  },
];

const DifferentiationSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-purple-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            기존 방식과 <span className="text-brand-500">완전히 다릅니다</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            똑같은 고민을 반복하지 마세요. 혁신적인 차이를 경험하세요.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-12 flex justify-center">
        <Image
          src="/image.png"
          alt="chefriend 앱 화면"
          width={1500}
          height={1252}
          className="rounded-lg shadow-xl w-full max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-auto"
          priority
        />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {differentiations.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-purple-100"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-gray-500 text-sm mb-1">Before</p>
                  <p className="text-xl font-bold text-gray-400 line-through">
                    {item.before}
                  </p>
                </div>

                <ArrowRight className="h-6 w-6 text-brand-500 mx-4" />

                <div className="text-center flex-1">
                  <p className="text-brand-500 text-sm mb-1">After</p>
                  <p className="text-xl font-bold text-brand-500">
                    {item.after}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-brand-500 text-white px-8 py-4 rounded-lg">
            <p className="text-lg font-semibold">
              셰프랜드로 시작하는 데이터 기반 매장 운영
            </p>
            <p className="text-sm mt-1 opacity-90">
              고객의 진짜 목소리를 들어보세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;