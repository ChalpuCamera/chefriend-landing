"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/landing/ui/input"
import { Button } from "@/components/landing/ui/button"

interface CouponPhoneSheetProps {
  open: boolean
  onClose: () => void
  siteLink: string
  storeId: number
}

export function CouponPhoneSheet({ open, onClose, siteLink, storeId }: CouponPhoneSheetProps) {
  const [phone, setPhone] = useState("")
  const router = useRouter()

  function formatPhoneNumber(value: string) {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "")

    // 최대 11자리까지만
    const limitedNumbers = numbers.slice(0, 11)

    // 하이픈 자동 삽입
    if (limitedNumbers.length <= 3) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!phone.trim()) {
      alert("전화번호를 입력해주세요")
      return
    }

    // localStorage에 저장
    localStorage.setItem(`coupon_phone_${siteLink}`, phone)

    // 쿠폰 페이지로 이동
    router.push(`/${siteLink}/coupon?phone=${encodeURIComponent(phone)}`)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-sub-title-b text-gray-900 mb-2">전화번호를 입력하세요</h2>
            <p className="text-body-r text-gray-600">쿠폰 적립 내역을 확인합니다</p>
          </div>

          <Input
            type="tel"
            placeholder="010-0000-0000"
            value={phone}
            onChange={handlePhoneChange}
            className="text-lg h-14"
            autoFocus
            required
          />

          <p className="text-sub-body-r text-gray-500">
            * 처음이시면 자동으로 등록됩니다
          </p>

          <Button type="submit" size="lg" className="w-full h-14 text-lg">
            확인
          </Button>
        </form>
      </div>
    </div>
  )
}
