"use client"

import { useEffect, useState } from "react"
import * as couponApi from "@/lib/api/coupon"

interface CouponEarnPinModalProps {
  open: boolean
  onClose: () => void
  pin: string
  expiredAt: string
  storeId: number
  phone: string
  onPinUsed: () => void
}

export function CouponEarnPinModal({ open, onClose, pin, expiredAt, storeId, phone, onPinUsed }: CouponEarnPinModalProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [status, setStatus] = useState<'active' | 'success' | 'expired'>('active')

  // Timer effect
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
    setStatus('active')

    // Update every second
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      if (newTimeLeft <= 0) {
        clearInterval(interval)
        setStatus('expired')
        alert("PIN이 만료되었습니다. 다시 시도해주세요.")
        onClose()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [open, expiredAt, onClose])

  // Polling effect - check PIN status every 1 second
  useEffect(() => {
    if (!open || status !== 'active') return

    const checkStatus = async () => {
      try {
        const result = await couponApi.checkPinStatus(storeId, phone, pin)
        if (result.isUsed) {
          setStatus('success')
          // Show success message for 1.5 seconds, then close
          setTimeout(() => {
            onPinUsed()
            onClose()
          }, 1500)
        }
      } catch (err) {
        // Silently fail - continue polling
        console.error("Failed to check PIN status:", err)
      }
    }

    // Initial check
    checkStatus()

    // Poll every 1 second
    const pollInterval = setInterval(checkStatus, 1000)

    return () => clearInterval(pollInterval)
  }, [open, status, storeId, phone, pin, onPinUsed, onClose])

  if (!open) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  // Success state UI
  if (status === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h2 className="text-headline-b text-gray-900 mb-2">적립 완료!</h2>
            <p className="text-body-r text-gray-600">스탬프가 적립되었습니다</p>
          </div>
        </div>
      </div>
    )
  }

  // Active state UI
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
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 mb-6">
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
