"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { FoodItemResponse } from "@/lib/types/customer";

interface MenuClientProps {
  menuData: FoodItemResponse;
  storeId: number;
}

export function MenuClient({ menuData, storeId }: MenuClientProps) {
  const router = useRouter();

  // photoUrl 사용 (단일 이미지)
  const imageUrl = menuData.photoUrl || menuData.thumbnailUrl || "/store.png";
  const menuName = menuData.name || menuData.foodName || "메뉴";
  const foodItemId = menuData.id || menuData.foodItemId;

  const handleBack = () => {
    router.back();
  };

  const handleReviewClick = () => {
    window.location.href = `https://ceo.chefriend.kr/customer/review?storeId=${storeId}&foodId=${foodItemId}`;
  };

  return (
    <div className="bg-white w-full mx-auto max-w-[430px]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-[430px] mx-auto">
        <div className="flex items-center h-11 px-3.5">
          <button
            className="flex items-center justify-center"
            onClick={handleBack}
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
        </div>

        {/* Title */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
          <h2 className="text-title-2 text-gray-800">
            {menuName}
          </h2>
          <span className="text-headline-b text-gray-900">
            {menuData.price.toLocaleString()}원
          </span>
        </div>
        </div>
      </div>
    </div>

      {/* Main Content */}
      <div className="pt-30">
        {/* Main Image */}
        <div className="px-4 mb-6">
          <div className="w-full h-[224px] rounded-xl flex items-center justify-center overflow-hidden">
            <Image
              src={imageUrl}
              alt={menuName}
              width={398}
              height={224}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Description */}
        {menuData.description && (
          <div className="px-4 mb-6">
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-body-r text-gray-800 text-center whitespace-pre-line leading-relaxed">
                {menuData.description}
              </p>
            </div>
          </div>
        )}

        {/* Review Button */}
        {menuData.hasActiveReview && (
          <div className="px-4 pb-6">
            <button
              onClick={handleReviewClick}
              className="w-full py-3 bg-[#7790AC] text-white rounded-xl text-body-sb hover:bg-[#6a7d99] transition-colors"
            >
              리뷰 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
