"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { LinkButton } from "@/components/link-button";
import { IoRestaurantOutline } from "react-icons/io5";
import type { TemplateProps } from "./types";
import { Card, CardHeader } from "@/components/landing/ui/card";

export default function Template3({ storeData }: TemplateProps) {
  const links = storeData.links || [];
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

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
              <p className="text-lg text-gray-600 font-medium">
                {storeData.storeName}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-sub-body-r text-gray-500">공지사항</p>
          {storeData.description && (
            <Card className="p-4 mt-4">
              <CardHeader>
                <p className="text-sub-body-r text-gray-500">
                  {storeData.description}
                </p>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Share Button */}
        <div className="mb-6">
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
        </div>
      </div>

      {/* Links Section */}
      <div className="px-6 pb-6">
        <div className="flex flex-col gap-3">
          {links.length > 0 ? (
            links.map((link, index) => (
              <LinkButton
                key={index}
                linkType={link.linkType}
                url={link.url}
                label={link.label || link.customLabel}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>등록된 링크가 없습니다</p>
            </div>
          )}
        </div>
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
                value={
                  typeof window !== "undefined" ? window.location.href : ""
                }
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
    </div>
  );
}
