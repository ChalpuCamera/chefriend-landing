import {
  Lock,
  ChartBar,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import CtaButton from "./CtaButton";

const features = [
  {
    icon: <DollarSign className="h-12 w-12 text-brand-500" aria-hidden="true" />,
    title: "💰 매출 먼저, 피드백은 덤",
    value: "고객이 피드백을 남기려면 반드시 선주문 필요",
    benefit: "피드백 20개 받으면서 동시에 40만원 매출 확정",
    message: "피드백 과정에서 매출 손실 제로, 오히려 피드백 받을수록 매출 증가",
  },
  {
    icon: (
      <Lock className="h-12 w-12 text-brand-500" aria-hidden="true" />
    ),
    title: "🔒 별점 테러 걱정 없는 비공개 환경",
    value: "공개 플랫폼이 아닌 완전 비공개 시스템",
    benefit: "6개월간 악성 리뷰 0개로 안심 운영",
    message: "사장님만 보는 안전한 피드백, 건설적 피드백만 선별 전달",
  },
  {
    icon: <ChartBar className="h-12 w-12 text-brand-500" aria-hidden="true" />,
    title: "📊 추측이 아닌 데이터로 정확한 개선",
    value: "\"너무 짜요\" → \"염도 10% 줄이면 만족도 20% 상승\"",
    benefit: "데이터 기반 개선으로 3개월 만에 매출 28% 증가",
    message: "맛·양·가격 수치화로 명확한 개선 포인트 제시",
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="container mx-auto px-4 section-padding"
      aria-labelledby="features-heading"
    >
      {/* <div className="max-w-5xl mx-auto mb-12 flex justify-center">
        <Image
          src="/image.png"
          alt="chefriend 앱 화면"
          width={1500}
          height={1252}
          className="rounded-lg shadow-xl w-full max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-auto"
          priority
        />
      </div> */}
      <div className="text-center mb-12">
        <h2
          id="features-heading"
          className="text-2xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          이제 안전하게 피드백 받으면서
          <br />
          <span className="text-brand-500">확실한 매출까지 올리세요</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          기존의 위험한 방식과는 완전히 다른 혁신적인 솔루션
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <article
            key={index}
            className="feature-card flex flex-col p-8 hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{feature.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {feature.title}
              </h3>
            </div>
            <div className="space-y-3 ml-16">
              <div className="flex items-start">
                <span className="text-brand-500 font-semibold mr-2">가치:</span>
                <span className="text-gray-700">{feature.value}</span>
              </div>
              <div className="flex items-start">
                <span className="text-brand-500 font-semibold mr-2">혜택:</span>
                <span className="text-gray-700">{feature.benefit}</span>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-purple-800 font-medium">💬 {feature.message}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
