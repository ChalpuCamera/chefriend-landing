"use client"

import { useEffect, useState } from "react"

export function CouponRedeemSuccess() {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white w-full mx-auto min-h-screen max-w-[430px] flex flex-col items-center justify-center p-6">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-title-1 text-gray-900 mb-3 text-center">
        쿠폰 사용 완료!
      </h1>

      {/* Subtitle */}
      <p className="text-body-r text-gray-600 mb-8 text-center">
        감사합니다
      </p>

      {/* Real-time Clock */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl px-8 py-6 mb-8 shadow-sm">
        <p className="text-sub-body-r text-gray-600 mb-2 text-center">현재 시각</p>
        <p className="text-3xl font-mono font-bold text-center tracking-wider text-gray-900">
          {currentTime}
        </p>
      </div>

      {/* Dynamic QR-like Pattern */}
      <div className="grid grid-cols-8 gap-1 mb-8">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${
              Math.random() > 0.5 ? "bg-gray-900" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Warning Text */}
      <p className="text-sub-body-r text-gray-500 text-center max-w-sm">
        이 화면을 사장님께 보여주세요
        <br />
        화면 캡처는 유효하지 않습니다
      </p>
    </div>
  )
}
