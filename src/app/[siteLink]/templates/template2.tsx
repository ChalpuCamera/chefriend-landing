"use client";

import type { TemplateProps } from "./types";

export default function Template2({ storeId, storeData, foodsData }: TemplateProps) {
  return (
    <div className="bg-white w-full mx-auto min-h-screen max-w-[430px] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          템플릿 2
        </h1>
        <p className="text-gray-600 mb-2">
          {storeData.storeName}
        </p>
        <p className="text-sm text-gray-400">
          피그마 디자인 작업 후 여기에 적용 예정
        </p>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500">
            storeId: {storeId} | 메뉴 {foodsData.length}개
          </p>
        </div>
      </div>
    </div>
  );
}
