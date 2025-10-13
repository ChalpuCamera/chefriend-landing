"use client";

import { useState, useEffect, useRef } from "react";
import ContactFormModal from "./ContactFormModal";
import { ChevronRight } from "lucide-react";

export default function FloatingCtaButton() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 헤더의 CTA 버튼을 찾습니다
    const ctaButton = document.querySelector("button");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (ctaButton) {
      observer.observe(ctaButton);
    }

    return () => {
      if (ctaButton) {
        observer.unobserve(ctaButton);
      }
    };
  }, []);

  if (isHeaderVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-full whitespace-nowrap ring-2 ring-white/20"
          aria-label="chefriend 무료 체험 신청"
        >
          <span className="whitespace-nowrap">무료로 시작하기</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </button>
      </div>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
