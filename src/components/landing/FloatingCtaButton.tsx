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
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-full"
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
