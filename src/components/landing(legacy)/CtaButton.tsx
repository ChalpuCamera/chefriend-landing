"use client";

import { useState } from "react";
import ContactFormModal from "./ContactFormModal";
import { ChevronRight } from "lucide-react";

export default function CtaButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 무료 체험 신청 버튼 */}
      <div className="mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-full ring-2 ring-white/20"
          aria-label="chefriend 무료 체험 신청"
        >
          <span>무료로 시작하기</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
