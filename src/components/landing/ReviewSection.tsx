import { Card, CardContent } from "@/components/landing/ui/card";
import { Star } from "lucide-react";
import CtaButton from "./CtaButton";

const ReviewSection = () => {
  const reviews = [
    {
      name: "김○○ (치킨집 사장님)",
      content:
        "드디어 '맛없다'는 이유를 정확히 알게 됐어요. 양념이 짜다는 피드백이 70%였는데, 염도를 15% 줄이니 재주문율이 40% 올랐습니다!",
      rating: 5,
    },
    {
      name: "박○○ (카페 운영)",
      content:
        "별점 테러 걱정 없이 진짜 개선점을 파악할 수 있어요. 커피 온도와 당도에 대한 구체적인 데이터로 메뉴를 개선했더니 매출이 25% 증가했어요.",
      rating: 5,
    },
    {
      name: "이○○ (분식점)",
      content:
        "피드백 받으려면 주문이 먼저니까 매출도 확보되고, 정확한 개선방향도 알 수 있어 일석이조예요. 떡볶이 매운맛 단계를 세분화했더니 만족도가 크게 올랐어요!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            실제 자영업자 후기
          </h3>
          <p className="text-lg text-gray-600">
            이미 많은 사장님들이 효과를 체험하고 있어요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    &quot;{review.content}&quot;
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {review.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
