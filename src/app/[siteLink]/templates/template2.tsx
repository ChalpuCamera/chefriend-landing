"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { CouponPhoneSheet } from "@/components/coupon/CouponPhoneSheet";
import type { LinkType } from "@/lib/types/store";
import type { TemplateProps } from "./types";
import { FaInstagram, FaCarrot } from "react-icons/fa";
import { SiDoordash, SiUbereats, SiGrubhub, SiGooglemaps, SiKakaotalk, SiNaver } from "react-icons/si";
import { IoRestaurantOutline } from "react-icons/io5";
import { PiMapPinFill } from "react-icons/pi"

export default function Template2({ storeId, storeData, foodsData }: TemplateProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showCouponSheet, setShowCouponSheet] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Helper function to get link URL by type
  const getLinkUrl = (linkType: LinkType): string | undefined => {
    const link = storeData.links?.find(l => l.linkType === linkType);
    return link?.url;
  };

  // 외부 클릭 감지로 공유 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [showShareMenu]);

  // URL에 https://가 없으면 추가하는 함수
  const ensureHttps = (url: string | null | undefined): string | undefined => {
    if (!url) return undefined;
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return undefined;
    if (/^https?:\/\//i.test(trimmedUrl)) {
      return trimmedUrl;
    }
    return `https://${trimmedUrl}`;
  };

  // Instagram 링크를 올바른 형식으로 변환하는 함수
  const formatInstagramLink = (
    link: string | null | undefined
  ): string | undefined => {
    if (!link) return undefined;
    const trimmed = link.trim();
    if (!trimmed) return undefined;
    if (/instagram\.com/i.test(trimmed)) {
      return ensureHttps(trimmed);
    }
    const username = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
    return `https://instagram.com/${username}`;
  };

  const handleCopyUrl = async () => {
    try {
      const decodedUrl = decodeURIComponent(window.location.href).replace(
        /^https?:\/\/(www\.)?/,
        ""
      );

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(decodedUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = decodedUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } catch (fallbackErr) {
          console.error("Fallback copy failed:", fallbackErr);
          alert("URL 복사에 실패했습니다.");
          return;
        } finally {
          document.body.removeChild(textArea);
        }
      }

      setCopySuccess(true);
      setShowShareMenu(false);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      alert("URL 복사에 실패했습니다.");
    }
  };

  const handleShowQr = () => {
    setShowQrModal(true);
    setShowShareMenu(false);
  };

  const handleDownloadQr = () => {
    try {
      if (!qrRef.current) return;
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("QR 코드를 찾을 수 없습니다.");
        return;
      }
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${storeData.storeName}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download QR code:", err);
      alert("QR 코드 다운로드에 실패했습니다.");
    }
  };

  const handleCouponClick = () => {
    setShowCouponSheet(true);
  };

  return (
    <div className="bg-white w-full mx-auto min-h-screen max-w-[430px]">
      {/* Header Section */}
      <div className="px-6 pt-6 pb-4">
        {/* Store Icon & Tagline */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#7790AC] rounded-lg flex items-center justify-center">
                <IoRestaurantOutline className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg text-gray-600 font-medium">{storeData.storeName}</p>
            </div>
          </div>
          <p className="text-sub-body-r text-gray-500">
            {storeData.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {/* Share Button */}
          <div ref={shareMenuRef} className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
            >
              {copySuccess ? "✓ 복사 완료!" : "공유하기"}
            </button>

            {/* Dropdown Menu */}
            {showShareMenu && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-10">
                <button
                  onClick={handleCopyUrl}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  URL 복사
                </button>
                <button
                  onClick={handleShowQr}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
                >
                  QR 코드 보기
                </button>
              </div>
            )}
          </div>

          {/* Coupon Button */}
          <button
            onClick={handleCouponClick}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
          >
            쿠폰 적립/사용
          </button>
        </div>

        {/* Connect with Us Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            주문하러 가기
          </h2>
          <div className="space-y-2">
            {getLinkUrl("BAEMIN") && (
              <a
                href={ensureHttps(getLinkUrl("BAEMIN"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-[#7790AC] text-white rounded-lg hover:bg-[#6780a0] transition-colors"
              >
                <span className="font-medium text-base">배달의 민족</span>
              </a>
            )}
            {getLinkUrl("COUPANGEATS") && (
              <a
                href={ensureHttps(getLinkUrl("COUPANGEATS"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-[#7790AC] text-white rounded-lg hover:bg-[#6780a0] transition-colors"
              >
                <span className="font-medium text-base">쿠팡 이츠</span>
              </a>
            )}
            {getLinkUrl("YOGIYO") && (
              <a
                href={ensureHttps(getLinkUrl("YOGIYO"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-[#7790AC] text-white rounded-lg hover:bg-[#6780a0] transition-colors"
              >
                <span className="font-medium text-base">요기요</span>
              </a>
            )}
            {getLinkUrl("DDANGYO") && (
              <a
                href={ensureHttps(getLinkUrl("DDANGYO"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center  justify-center gap-3 w-full px-4 py-3 bg-[#7790AC] text-white rounded-lg hover:bg-[#6780a0] transition-colors"
              >
                <span className="font-medium text-base">땡겨요</span>
              </a>
            )}
          </div>
        </div>

        {/* Find Our Location Section */}
        {(getLinkUrl("GOOGLE_MAPS") || getLinkUrl("NAVER_MAP") || getLinkUrl("KAKAO_MAP")) && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              지도 
            </h2>
            <div className="space-y-2">
              {getLinkUrl("GOOGLE_MAPS") && (
                <a
                  href={ensureHttps(getLinkUrl("GOOGLE_MAPS"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SiGooglemaps className="w-5 h-5" />
                  <span className="font-medium text-base">구글 지도</span>
                </a>
              )}
              {(getLinkUrl("KAKAO_MAP")) && (
                <a
                  href={ensureHttps(getLinkUrl("KAKAO_MAP"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <PiMapPinFill  className="w-5 h-5" />
                  <span className="font-medium text-base">카카오 지도</span>
                </a>
              )}
              {(getLinkUrl("NAVER_MAP") || getLinkUrl("KAKAO_MAP")) && (
                <a
                  href={ensureHttps(getLinkUrl("NAVER_MAP") || getLinkUrl("KAKAO_MAP"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SiNaver className="w-5 h-5" />
                  <span className="font-medium text-base">네이버 지도</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Follow Us Section */}
        {(getLinkUrl("INSTAGRAM") || getLinkUrl("KAKAO_TALK") || getLinkUrl("DAANGN")) && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              SNS
            </h2>
            <div className="space-y-2">
              {getLinkUrl("INSTAGRAM") && (
                <a
                  href={formatInstagramLink(getLinkUrl("INSTAGRAM"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span className="font-medium text-base">인스타그램</span>
                </a>
              )}
              {getLinkUrl("KAKAO_TALK") && (
                <a
                  href={ensureHttps(getLinkUrl("KAKAO_TALK"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SiKakaotalk className="w-5 h-5" />
                  <span className="font-medium text-base">카카오 채널</span>
                </a>
              )}
              {getLinkUrl("DAANGN") && (
                <a
                  href={ensureHttps(getLinkUrl("DAANGN"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaCarrot className="w-5 h-5" />
                  <span className="font-medium text-base">당근</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Our Menu Section */}
        {foodsData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              메뉴
            </h2>

            <div className="space-y-3">
              {foodsData.map((food) => (
                <div key={food.foodItemId} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">{food.foodName}</p>
                    {food.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{food.description}</p>
                    )}
                  </div>
                  <p className="text-[16px] font-medium text-[#7A8750] ml-4">
                  ₩ {food.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-sub-title-b text-gray-500 text-center mb-6">
              QR 코드
            </h3>

            <div
              ref={qrRef}
              className="flex justify-center items-center bg-white p-6 rounded-2xl mb-6"
            >
              <QRCodeCanvas
                value={typeof window !== "undefined" ? window.location.href : ""}
                size={240}
                level="H"
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={handleDownloadQr}
                className="px-4 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all text-body-sb flex items-center justify-center gap-2"
              >
                다운로드
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Phone Sheet */}
      <CouponPhoneSheet
        open={showCouponSheet}
        onClose={() => setShowCouponSheet(false)}
        siteLink={storeData.siteLink || ""}
        storeId={storeId}
      />
    </div>
  );
}
