import { ArrowRight, Store, CreditCard, MessageSquare } from "lucide-react";

const ProcessDiagram = () => {
  const steps = [
    {
      icon: Store,
      title: "1. 메뉴 등록",
      description: ["사장님이 피드백 받고 싶은", "메뉴를 등록해요"],
      bgColor: "from-brand-500 to-brand-600",
    },
    {
      icon: CreditCard,
      title: "2. 평가단 주문",
      description: ["사장님 비용 부담", "절대 없어요"],
      highlight: { text: "절대 없어요", index: 1 },
      bgColor: "from-brand-500 to-brand-600",
    },
    {
      icon: MessageSquare,
      title: "3. 솔직한 피드백",
      description: ["100% 비공개로", "솔직한 평가를 전달해요"],
      highlight: { text: "100% 비공개", index: 0, color: "text-red-600" },
      bgColor: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-4 md:gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {/* Step */}
            <div className="flex flex-col items-center text-center group px-4 md:px-6">
              <div
                className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${step.bgColor} rounded-full flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform`}
              >
                <step.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 px-2">
                {step.description.map((line, lineIndex) => {
                  // 하이라이트 처리
                  if (step.highlight && step.highlight.index === lineIndex) {
                    if (step.highlight.text === "절대 없어요") {
                      return (
                        <span
                          key={lineIndex}
                          className="text-brand-600 font-semibold text-lg md:text-xl"
                        >
                          {step.highlight.text}
                        </span>
                      );
                    }
                    const parts = line.split(step.highlight.text);
                    return (
                      <span key={lineIndex}>
                        {parts[0]}
                        <span
                          className={`${
                            step.highlight.color || "text-brand-600"
                          } font-semibold`}
                        >
                          {step.highlight.text}
                        </span>
                        {parts[1]}
                        {lineIndex === 0 && <br />}
                      </span>
                    );
                  }
                  return (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex === 0 && <br />}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom highlight */}
      <div className="mt-8 md:mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 md:p-6 border border-purple-100">
        <div className="text-center">
          <p className="text-base md:text-lg text-gray-700">
            💰{" "}
            <span className="font-bold text-brand-600">
              피드백 받으면서 매출도 확보!
            </span>
            <br className="md:hidden" />
            <span className="md:ml-2">
              평가단의 선주문으로{" "}
              <span className="font-bold">확정 매출 + 진짜 피드백</span> 동시에
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessDiagram;
