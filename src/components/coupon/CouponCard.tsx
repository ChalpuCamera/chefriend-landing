"use client"

interface CouponCardProps {
  currentStamps: number
  totalStamps?: number
}

export function CouponCard({ currentStamps, totalStamps = 10 }: CouponCardProps) {
  // 스탬프 그리드는 10개 고정, 10개 넘어가면 모두 채워진 상태
  const stamps = Array.from({ length: totalStamps }, (_, index) => index < Math.min(currentStamps, totalStamps))

  // Progress bar는 100%까지만
  const progressPercentage = Math.min((currentStamps / totalStamps) * 100, 100)

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-sm">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-sub-title-b text-gray-900 mb-1">스탬프 카드</h2>
        <p className="text-title-1 text-gray-600">
          {currentStamps} / 10
        </p>
      </div>

      {/* Stamp Grid */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {stamps.map((filled, index) => (
          <div
            key={index}
            className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center transition-all duration-300"
          >
            {filled ? (
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-dashed" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
