"use client"

import { use, useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CouponCard } from "@/components/coupon/CouponCard"
import { CouponEarnPinModal } from "@/components/coupon/CouponEarnPinModal"
import { CouponRedeemSuccess } from "@/components/coupon/CouponRedeemSuccess"
import * as couponApi from "@/lib/api/coupon"

interface MembershipData {
  currentStamps: number
  canRedeem: boolean
  requiredStamps: number
}

interface PinData {
  pin: string
  expiredAt: string
}

export default function CouponPage({ params }: { params: Promise<{ siteLink: string }> }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")
  const { siteLink } = use(params)

  const [membership, setMembership] = useState<MembershipData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPinModal, setShowPinModal] = useState(false)
  const [pinData, setPinData] = useState<PinData | null>(null)
  const [showRedeemSuccess, setShowRedeemSuccess] = useState(false)
  const [storeId, setStoreId] = useState<number | null>(null)

  const fetchMembership = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // First get storeId from siteLink
      const fetchedStoreId = await couponApi.fetchStoreIdBySiteLink(siteLink)
      setStoreId(fetchedStoreId)

      // Then fetch membership
      const data = await couponApi.fetchMembership(fetchedStoreId, phone!)
      setMembership(data)
    } catch (err) {
      console.error("Failed to fetch membership:", err)
      setError(err instanceof Error ? err.message : "오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }, [siteLink, phone])

  useEffect(() => {
    if (!phone) {
      router.push(`/${siteLink}`)
      return
    }

    fetchMembership()
  }, [phone, siteLink, router, fetchMembership])

  async function handleEarn() {
    if (!storeId || !phone) return

    try {
      const data = await couponApi.generatePin(storeId, phone)
      setPinData(data)
      setShowPinModal(true)
    } catch (err) {
      console.error("Failed to generate PIN:", err)
      alert(err instanceof Error ? err.message : "PIN 생성에 실패했습니다")
    }
  }

  async function handleRedeem() {
    if (!storeId || !phone) return

    try {
      const data = await couponApi.redeemCoupon(storeId, phone)
      if (data.success) {
        setShowRedeemSuccess(true)
        // Refresh membership after 5 seconds (when animation completes)
        setTimeout(() => {
          setShowRedeemSuccess(false)
          fetchMembership()
        }, 5000)
      }
    } catch (err) {
      console.error("Failed to redeem coupon:", err)
      alert(err instanceof Error ? err.message : "쿠폰 사용에 실패했습니다")
    }
  }

  function handlePinModalClose() {
    setShowPinModal(false)
    setPinData(null)
  }

  function handlePinUsed() {
    // Refresh membership data when PIN is used
    fetchMembership()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-chefriend border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body-r text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white p-6">
        <div className="text-center max-w-sm">
          <p className="text-headline-b text-gray-900 mb-4">오류</p>
          <p className="text-body-r text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push(`/${siteLink}`)}
            className="px-6 py-3 bg-purple-500 text-white rounded-3xl hover:bg-purple-500/90 transition-all"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  if (showRedeemSuccess) {
    return <CouponRedeemSuccess />
  }

  return (
    <div className="bg-white w-full mx-auto min-h-screen max-w-[430px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-headline-b text-gray-900">쿠폰</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Phone Display */}
      <div className="mb-6 text-center">
        <p className="text-sub-body-r text-gray-600">전화번호</p>
        <p className="text-body-sb text-gray-900 mt-1">{phone}</p>
      </div>

      {/* Coupon Card */}
      {membership && (
        <CouponCard currentStamps={membership.currentStamps} totalStamps={membership.requiredStamps} />
      )}

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <button
          onClick={handleEarn}
          className="w-full px-6 py-4 bg-white border-2 border-chefriend text-chefriend rounded-3xl hover:bg-purple-500 hover:text-white transition-all text-headline-b shadow-sm"
        >
          적립하기
        </button>
        <button
          onClick={handleRedeem}
          disabled={!membership?.canRedeem}
          className={`w-full px-6 py-4 rounded-3xl text-headline-b transition-all shadow-sm ${
            membership?.canRedeem
              ? "bg-purple-500 text-white hover:bg-purple-500/90"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {membership?.canRedeem ? "사용하기" : "스탬프를 더 모아주세요"}
        </button>
      </div>

      {/* PIN Modal */}
      {showPinModal && pinData && storeId && phone && (
        <CouponEarnPinModal
          open={showPinModal}
          onClose={handlePinModalClose}
          pin={pinData.pin}
          expiredAt={pinData.expiredAt}
          storeId={storeId}
          phone={phone}
          onPinUsed={handlePinUsed}
        />
      )}
    </div>
  )
}
