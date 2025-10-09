"use client";

import Image from "next/image";
import { useState } from "react";
import type { StoreResponse, FoodItemResponse } from "@/lib/types/store";

interface StoreClientProps {
  storeId: number;
  storeData: StoreResponse;
  foodsData: FoodItemResponse[];
}

export function StoreClient({ storeData, foodsData }: StoreClientProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyUrl = async () => {
    try {
      // URL에서 띄어쓰기(%20)를 하이픈(-)으로 변환
      const urlWithDashes = window.location.href
        .replace(/%20/g, "-")
        .replace(/ /g, "-");
      await navigator.clipboard.writeText(urlWithDashes);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="bg-white w-full mx-auto min-h-screen max-w-[430px]">
      {/* Store Header Image */}
      <div className="p-6 pb-0">
        <div className="w-full h-64 relative bg-gray-100 rounded-3xl overflow-hidden">
          <Image
            src={storeData.thumbnailUrl || "/kimchi.png"}
            alt={storeData.storeName}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Store Info */}
      <div className="p-6 flex flex-col items-center text-center">
        <h1 className="text-title-1 text-gray-900 mb-2">
          {storeData.storeName}
        </h1>
        {storeData.description && (
          <p className="text-sub-body-r text-gray-600 max-w-md">
            {storeData.description}
          </p>
        )}
        {storeData.address && (
          <p className="text-sub-body-r text-gray-500 mt-2">📍 {storeData.address}</p>
        )}
        <p className="text-sub-body-sb text-chefriend mt-3">
          메뉴 {foodsData.length}개
        </p>

        {/* URL Copy Button */}
        <button
          onClick={handleCopyUrl}
          className="mt-4 w-full max-w-sm px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all text-body-sb shadow-sm"
        >
          {copySuccess ? "✓ 복사 완료!" : "URL 복사"}
        </button>
      </div>

      {/* SNS Section */}
      <div className="px-6 mb-6">
        <h3 className="text-sub-title-b text-gray-900 mb-3">SNS</h3>
        <a
          href={storeData.instagramLink || "https://instagram.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">Instagram</span>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>

      {/* Map Links Section */}
      <div className="px-6 mb-6">
        <h3 className="text-sub-title-b text-gray-900 mb-3">지도</h3>
        <div className="space-y-3">
          {/* Naver Map Link */}
          <a
            href={storeData.naverMapLink || "https://map.naver.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#03C75A] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">네이버 지도</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Kakao Map Link */}
          <a
            href={storeData.kakaoMapLink || "https://map.kakao.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FEE500] rounded-xl flex items-center justify-center">
                  <span className="text-[#3C1E1E] font-bold text-sm">K</span>
                </div>
                <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">카카오맵</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Delivery Links */}
      {/* Order Section */}
      <div className="px-6 mb-6">
        <h3 className="text-sub-title-b text-gray-800 mb-4">
          바로 주문하러 가기
        </h3>
        {/* Delivery Apps Grid */}
        <div className="flex gap-4 justify-between">
          {/* 요기요 */}
          <a
            href={storeData.yogiyoLink || "https://www.yogiyo.co.kr"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
          >
            <div className="w-[74px] h-[74px] border border-gray-300 rounded-xl overflow-hidden mb-2">
              <Image
                src="/yogiyo.png"
                alt="요기요"
                width={74}
                height={74}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-body-sb text-gray-800">요기요</p>
          </a>

          {/* 배달의민족 */}
          <a
            href={storeData.baeminLink || "https://www.baemin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
          >
            <div className="w-[74px] h-[74px] border border-gray-300 rounded-xl overflow-hidden mb-2">
              <Image
                src="/baemin.png"
                alt="배달의민족"
                width={74}
                height={74}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-body-sb text-gray-800">배달의민족</p>
          </a>

          {/* 쿠팡이츠 */}
          <a
            href={storeData.coupangEatsLink || "https://www.coupangeats.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
          >
            <div className="w-[74px] h-[74px] border border-gray-300 rounded-xl overflow-hidden mb-2">
              <Image
                src="/coupangeats.png"
                alt="쿠팡이츠"
                width={74}
                height={74}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-body-sb text-gray-800">쿠팡이츠</p>
          </a>
        </div>
      </div>

      {/* Menu List */}
      {foodsData.length > 0 && (
        <div className="px-6 pb-6">
          <h2 className="text-sub-title-b text-gray-900 mb-4">메뉴</h2>
          <div className="space-y-4">
            {foodsData.map((food) => (
              <div
                key={food.foodItemId}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={food.thumbnailUrl || "/kimchi.png"}
                  alt={food.foodName}
                  width={98}
                  height={98}
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {foodsData.length === 0 && (
        <div className="px-6 pb-12 text-center">
          <p className="text-sub-body-r text-gray-500">등록된 메뉴가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
