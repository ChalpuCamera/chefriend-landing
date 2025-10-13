import { X, TrendingDown, AlertTriangle, MessageSquare } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: <X className="w-6 h-6" />,
      title: '"맛없다"는 악성 리뷰 하나에 매출 뚝',
      description: "공개 플랫폼의 한 줄 악평이 한 달 매출을 날려버립니다"
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "뭘 개선해야 할지 몰라서 계속 적자",
      description: "막연한 추측으로만 메뉴를 바꾸다가 더 큰 손실만 납니다"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "고객 의견 듣고 싶지만 별점 테러 무서워",
      description: "진짜 피드백이 필요한데 공개 리뷰는 너무 위험합니다"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: '"맛있어요", "잘 먹었습니다" 형식적 리뷰만 가득',
      description: "도움 안 되는 립서비스 리뷰로는 개선점을 찾을 수 없습니다"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 flex flex-col items-center gap-5">
            사장님, 이런 고민 때문에
            <br />
            <span className="text-red-500">밤잠 못 이루시죠?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            혼자 끙끙 앓지 마세요. 이제 해답이 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-red-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 강조 메시지 */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-brand-500 to-brand-600 p-8 rounded-3xl shadow-xl">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              더 이상 혼자 고민하지 마세요
            </p>
            <p className="text-lg text-white/90">
              이제 안전하고 확실한 해답이 있습니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;