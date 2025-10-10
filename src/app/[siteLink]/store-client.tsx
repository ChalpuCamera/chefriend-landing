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
      // URL 디코딩하여 한글을 읽기 쉽게 변환
      const decodedUrl = decodeURIComponent(window.location.href).replace(
        /^https?:\/\/(www\.)?/,
        ""
      );
      await navigator.clipboard.writeText(decodedUrl);
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
            quality={90}
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
          <p className="text-sub-body-r text-gray-500 mt-2">
            📍 {storeData.address}
          </p>
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
      {(storeData.instagramLink || storeData.kakaoTalkLink) && (
        <div className="px-6 mb-6">
          <h3 className="text-sub-title-b text-gray-900 mb-3">SNS</h3>
          <div className="grid grid-cols-1 gap-3">
            {storeData.instagramLink && (
              <a
                href={storeData.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative">
                      <Image
                        src="/instagram.png"
                        alt="Instagram"
                        width={144}
                        height={144}
                        quality={90}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">
                      {storeData.instagramLink}
                    </span>
                  </div>
                </div>
              </a>
            )}
            {storeData.kakaoTalkLink && (
              <a
                href={storeData.kakaoTalkLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative">
                      <Image
                        src="/kakaotalk.png"
                        alt="카카오톡"
                        width={144}
                        height={144}
                        quality={90}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">
                      카카오톡 오픈채팅
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
        <div className="px-6 mb-6">
          <h3 className="text-sub-title-b text-gray-900 mb-3">지도</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Naver Map Link */}
            {storeData.naverLink && (
              <a
                href={storeData.naverLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden relative mb-2">
                  <Image
                    src="/naver.png"
                    alt="Naver Map"
                    width={144}
                    height={144}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">
                  네이버 지도
                </span>
              </a>
            )}

            {/* Kakao Map Link */}
            {storeData.kakaoLink && (
              <a
                href={storeData.kakaoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden relative mb-2">
                  <Image
                    src="/kakaomap.png"
                    alt="Kakao Map"
                    width={144}
                    height={144}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-body-sb text-gray-900 group-hover:text-chefriend transition-colors">
                  카카오맵
                </span>
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
        <div className="px-6 mb-6">
          <h3 className="text-sub-title-b text-gray-800 mb-4">
            바로 주문하러 가기
          </h3>
          {/* Delivery Apps Grid */}
          <div className="flex gap-4 justify-start">
            {/* 배달의민족 */}
            {storeData.baeminLink && (
              <a
                href={storeData.baeminLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-[74px] overflow-hidden mb-2">
                  <Image
                    src="/baemin.png"
                    alt="배달의민족"
                    width={200}
                    height={200}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-body-sb text-gray-800">배달의민족</p>
              </a>
            )}

            {/* 쿠팡이츠 */}
            {storeData.coupangEatsLink && (
              <a
                href={storeData.coupangEatsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-[74px] overflow-hidden mb-2">
                  <Image
                    src="/coupangeats.png"
                    alt="쿠팡이츠"
                    width={200}
                    height={200}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-body-sb text-gray-800">쿠팡이츠</p>
              </a>
            )}
            
            {/* 요기요 */}
            {storeData.yogiyoLink && (
              <a
                href={storeData.yogiyoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-[74px] overflow-hidden mb-2">
                  <Image
                    src="/yogiyo.png"
                    alt="요기요"
                    width={200}
                    height={200}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-body-sb text-gray-800">요기요</p>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Menu List */}
      {foodsData.length > 0 && (
        <div className="px-6 pb-6">
          <h2 className="text-sub-title-b text-gray-900 mb-4">메뉴</h2>
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
    </div>
  );
}
