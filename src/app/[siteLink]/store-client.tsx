"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { StoreResponse, FoodItemResponse } from "@/lib/types/store";
import { QRCodeCanvas } from "qrcode.react";

interface StoreClientProps {
  storeId: number;
  storeData: StoreResponse;
  foodsData: FoodItemResponse[];
}

export function StoreClient({ storeData, foodsData }: StoreClientProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCopySuccess, setQrCopySuccess] = useState(false);
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
      // click 이벤트 대신 mouseup/touchend를 사용하여 버튼 클릭이 먼저 처리되도록
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

    // 앞뒤 공백 제거
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return undefined;

    // 이미 http:// 또는 https://로 시작하는 경우 (대소문자 무관)
    if (/^https?:\/\//i.test(trimmedUrl)) {
      return trimmedUrl;
    }

    // https:// 추가
    return `https://${trimmedUrl}`;
  };

  // Instagram 링크를 올바른 형식으로 변환하는 함수
  const formatInstagramLink = (
    link: string | null | undefined
  ): string | undefined => {
    if (!link) return undefined;

    // 앞뒤 공백 제거
    const trimmed = link.trim();
    if (!trimmed) return undefined;

    // 이미 완전한 URL인 경우 (instagram.com 포함)
    if (/instagram\.com/i.test(trimmed)) {
      return ensureHttps(trimmed);
    }

    // 아이디만 있는 경우: @ 제거 후 instagram.com URL 생성
    const username = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
    return `https://instagram.com/${username}`;
  };

  const handleCopyUrl = async () => {
    try {
      // URL 디코딩하여 한글을 읽기 쉽게 변환
      const decodedUrl = decodeURIComponent(window.location.href).replace(
        /^https?:\/\/(www\.)?/,
        ""
      );

      // Clipboard API가 사용 가능한지 확인
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(decodedUrl);
      } else {
        // Fallback: textarea를 이용한 복사
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

  const handleCopyQr = async () => {
    try {
      if (!qrRef.current) return;

      // qrcode.react는 canvas를 생성하므로 canvas를 직접 찾음
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("QR 코드를 찾을 수 없습니다.");
        return;
      }

      // Clipboard API 지원 확인
      if (!navigator.clipboard || !navigator.clipboard.write) {
        alert("클립보드 복사가 지원되지 않는 브라우저입니다. 다운로드를 사용해주세요.");
        return;
      }

      // 동기적으로 dataURL 생성 (사용자 제스처 컨텍스트 유지)
      const dataUrl = canvas.toDataURL("image/png");

      // dataURL을 blob으로 변환
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // 클립보드에 이미지 쓰기
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      setQrCopySuccess(true);
      setTimeout(() => setQrCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy QR code:", err);

      // 에러 메시지 개선
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes("denied") || errorMessage.includes("permission")) {
        alert("클립보드 접근 권한이 필요합니다. 브라우저 설정을 확인해주세요.");
      } else if (errorMessage.includes("secure") || errorMessage.includes("https")) {
        alert("보안 연결(HTTPS)에서만 복사할 수 있습니다.");
      } else {
        alert("클립보드에 복사할 수 없습니다. 다운로드를 사용해주세요.");
      }
    }
  };

  const handleDownloadQr = () => {
    try {
      if (!qrRef.current) return;

      // qrcode.react는 canvas를 생성하므로 canvas를 직접 찾음
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("QR 코드를 찾을 수 없습니다.");
        return;
      }

      // canvas를 이미지로 변환하여 다운로드
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
      {/* Store Header Image */}
      <div className="p-6 pb-0">
        <div className="w-full h-52 relative bg-gray-100 rounded-3xl overflow-hidden">
          <Image
            src={storeData.thumbnailUrl || "/store.png"}
            alt={storeData.storeName}
            fill
            quality={95}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Store Info */}
      <div className="p-4 flex flex-col items-center text-center">
        <h1 className="text-title-1 text-gray-900 mb-2">
          {storeData.storeName}
        </h1>
        {storeData.description && (
          <p className="text-sub-body-r text-gray-600 max-w-md">
            {storeData.description}
          </p>
        )}
        {storeData.address && (
          <p className="text-sub-body-r text-gray-500 mt-2">
            📍 {storeData.address}
          </p>
        )}

        {/* Share Button with Dropdown */}
        <div ref={shareMenuRef} className="relative mt-4 w-full max-w-sm">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-700 text-gray-700 rounded-3xl hover:bg-gray-900 hover:text-white transition-all text-body-sb shadow-sm"
          >
            {copySuccess ? "✓ 복사 완료!" : "공유하기"}
          </button>

          {/* Dropdown Menu */}
          {showShareMenu && (
            <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-900 rounded-2xl shadow-lg overflow-hidden z-10">
              <button
                onClick={handleCopyUrl}
                className="w-full px-4 py-3 text-body-sb text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                URL 복사
              </button>
              <button
                onClick={handleShowQr}
                className="w-full px-4 py-3 text-body-sb text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
              >
                QR 코드 보기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SNS Section */}
      {(storeData.instagramLink || storeData.kakaoTalkLink) && (
        <div className="px-6 mb-4">
          <h3 className="text-sub-title-b text-gray-900 mb-2">SNS</h3>
          <div className={`grid gap-2 ${storeData.instagramLink && storeData.kakaoTalkLink ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {storeData.instagramLink && (
              <a
                href={formatInstagramLink(storeData.instagramLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-xl overflow-hidden relative flex-shrink-0">
                      <Image
                        src="/instagram.png"
                        alt="Instagram"
                        width={144}
                        height={144}
                        quality={90}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className="text-sub-body-sb text-gray-900 group-hover:text-chefriend transition-colors truncate"
                      title={storeData.instagramLink || undefined}
                    >
                      {storeData.instagramLink}
                    </span>
                  </div>
                </div>
              </a>
            )}
            {storeData.kakaoTalkLink && (
              <a
                href={ensureHttps(storeData.kakaoTalkLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-xl overflow-hidden relative flex-shrink-0">
                      <Image
                        src="/kakaotalk.png"
                        alt="카카오톡"
                        width={144}
                        height={144}
                        quality={90}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sub-body-sb text-gray-900 group-hover:text-chefriend transition-colors truncate">
                      카카오톡 채널
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Map Links Section */}
      {(storeData.naverLink || storeData.kakaoLink) && (
        <div className="px-6 mb-4">
          <h3 className="text-sub-title-b text-gray-900 mb-2">지도</h3>
          <div className={`grid gap-2 ${storeData.naverLink && storeData.kakaoLink ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {/* Naver Map Link */}
            {storeData.naverLink && (
              <a
                href={ensureHttps(storeData.naverLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl overflow-hidden relative">
                    <Image
                      src="/naver.png"
                      alt="Naver Map"
                      width={144}
                      height={144}
                      quality={90}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sub-body-sb text-gray-900 group-hover:text-chefriend transition-colors">
                    네이버 지도
                  </span>
                </div>
              </a>
            )}

            {/* Kakao Map Link */}
            {storeData.kakaoLink && (
              <a
                href={ensureHttps(storeData.kakaoLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl overflow-hidden relative">
                    <Image
                      src="/kakaomap.png"
                      alt="Kakao Map"
                      width={144}
                      height={144}
                      quality={90}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sub-body-sb text-gray-900 group-hover:text-chefriend transition-colors">
                    카카오맵
                  </span>
                </div>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Delivery Links */}
      {/* Order Section */}
      {(storeData.yogiyoLink ||
        storeData.baeminLink ||
        storeData.coupangEatsLink) && (
        <div className="px-6 mb-4">
          <h3 className="text-sub-title-b text-gray-800 mb-2">
            바로 주문하러 가기
          </h3>
          {/* Delivery Apps Grid */}
          <div className="flex gap-3 justify-start">
            {/* 배달의민족 */}
            {storeData.baeminLink && (
              <a
                href={ensureHttps(storeData.baeminLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 overflow-hidden mb-2">
                  <Image
                    src="/baemin.png"
                    alt="배달의민족"
                    width={200}
                    height={200}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sub-body-sb text-gray-800">배달의민족</p>
              </a>
            )}

            {/* 쿠팡이츠 */}
            {storeData.coupangEatsLink && (
              <a
                href={ensureHttps(storeData.coupangEatsLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 overflow-hidden mb-2">
                  <Image
                    src="/coupangeats.png"
                    alt="쿠팡이츠"
                    width={200}
                    height={200}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sub-body-sb text-gray-800">쿠팡이츠</p>
              </a>
            )}

            {/* 요기요 */}
            {storeData.yogiyoLink && (
              <a
                href={ensureHttps(storeData.yogiyoLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 overflow-hidden mb-2">
                  <Image
                    src="/yogiyo.png"
                    alt="요기요"
                    width={200}
                    height={200}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sub-body-sb text-gray-800">요기요</p>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Menu List */}
      {foodsData.length > 0 && (
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sub-title-b text-gray-900">메뉴</h2>
            {foodsData.length > 0 && <p className="text-sub-body-sb text-chefriend">
              메뉴 {foodsData.length}개
            </p>}
          </div>
          <div className="space-y-4">
            {foodsData.map((food) => (
              <div
                key={food.foodItemId}
                className={`flex items-center gap-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${
                  food.thumbnailUrl ? "p-4" : "p-3"
                }`}
              >
                {food.thumbnailUrl ? (
                  <>
                    <Image
                      src={food.thumbnailUrl}
                      alt={food.foodName}
                      width={256}
                      height={256}
                      quality={90}
                      className="rounded-lg object-cover w-24 h-24"
                    />
                    <div className="flex-1">
                      <h3 className="text-headline-b text-gray-900">
                        {food.foodName}
                      </h3>
                      {food.description && (
                        <p className="text-sub-body-r text-gray-600 mt-1">
                          {food.description}
                        </p>
                      )}
                      <p className="text-body-sb text-chefriend mt-2">
                        {food.price.toLocaleString()}원
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-headline-b text-gray-900">
                        {food.foodName}
                      </h3>
                      <p className="text-body-sb text-chefriend">
                        {food.price.toLocaleString()}원
                      </p>
                    </div>
                    {food.description && (
                      <p className="text-sub-body-r text-gray-600 mt-1">
                        {food.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {foodsData.length === 0 && (
        <div className="px-6 pb-12 text-center">
          <p className="text-sub-body-r text-gray-500">
            등록된 메뉴가 없습니다.
          </p>
        </div>
      )}

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
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
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

            {/* Modal Title */}
            <h3 className="text-sub-title-b text-gray-900 text-center mb-6">
              QR 코드
            </h3>

            {/* QR Code */}
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

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-2">
              {/* <button
                onClick={handleCopyQr}
                className="px-4 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all text-body-sb flex items-center justify-center gap-2"
              >
                {qrCopySuccess ? "✓ 복사됨" : "복사"}
              </button> */}
              <button
                onClick={handleDownloadQr}
                className="px-4 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all text-body-sb flex items-center justify-center gap-2"
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
