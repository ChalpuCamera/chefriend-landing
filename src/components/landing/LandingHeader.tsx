"use client";

import Image from "next/image";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between max-w-screen-xl">
        <div className="flex items-center gap-2">
          <Image
            src="/logo_big.png"
            alt="셰프랜드 로고"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-lg md:text-xl font-bold text-gray-900">셰프랜드</span>
        </div>
      </div>
    </header>
  );
}
