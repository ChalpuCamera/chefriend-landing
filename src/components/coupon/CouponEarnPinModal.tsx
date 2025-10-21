"use client"

import { useEffect, useState } from "react"

interface CouponEarnPinModalProps {
  open: boolean
  onClose: () => void
  pin: string
  expiredAt: string
}

export function CouponEarnPinModal({ open, onClose, pin, expiredAt }: CouponEarnPinModalProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    if (!open) return

    // Calculate initial time left
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiredAt).getTime()
      const diff = Math.max(0, Math.floor((expiry - now) / 1000))
      return diff
    }

    setTimeLeft(calculateTimeLeft())

    // Update every second
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      if (newTimeLeft <= 0) {
        clearInterval(interval)
        alert("PIN이 만료되었습니다. 다시 시도해주세요.")
        onClose()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [open, expiredAt, onClose])

  if (!open) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-sub-title-b text-gray-900 mb-6">적립 PIN 번호</h2>

          {/* PIN Display */}
          <div className="bg-gradient-to-br from-chefriend to-chefriend/80 rounded-2xl p-8 mb-6">
            <p className="text-6xl font-bold text-white tracking-wider mb-2">{pin}</p>
            <div className="h-px bg-white/30 mb-4" />
            <p className="text-body-r text-white/90">이 번호를 사장님께 알려주세요</p>
          </div>

          {/* Timer */}
          <div className="mb-6">
            <div
              className={`inline-flex items-center justify-center px-4 py-2 rounded-full ${
                timeLeft <= 30 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-body-sb font-mono">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-2xl p-4 text-left">
            <p className="text-sub-body-sb text-gray-900 mb-2">💡 사용 방법</p>
            <ol className="text-sub-body-r text-gray-600 space-y-1">
              <li>1. 사장님께 이 번호를 알려주세요</li>
              <li>2. 사장님이 태블릿에 입력합니다</li>
              <li>3. 적립 완료!</li>
            </ol>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-900 rounded-3xl hover:bg-gray-200 transition-all text-body-sb"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
