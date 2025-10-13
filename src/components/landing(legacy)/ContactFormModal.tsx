"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import LegalInfoModal from "./LegalInfoModal";
import { Checkbox } from "@/components/landing/ui/checkbox";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);

  // 필수 필드가 모두 채워졌는지 확인
  const isFormValid =
    formData.storeName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    isPrivacyChecked;

  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장 (선택사항)
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // cleanup 함수
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPrivacyChecked) {
      toast.error("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS 설정 - 환경변수에서 가져오기
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error(
          "EmailJS 설정이 필요합니다. .env.local 파일을 확인해주세요."
        );
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          store_name: formData.storeName,
          phone: formData.phone,
          message: formData.message || "없음",
          to_email: "chefrieend@gmail.com",
        },
        PUBLIC_KEY
      );

      toast.success("신청이 완료되었습니다! 곧 연락드리겠습니다.");
      setFormData({
        storeName: "",
        phone: "",
        message: "",
      });
      setIsPrivacyChecked(false);
      onClose();
    } catch (error) {
      console.error("이메일 전송 실패:", error);
      toast.error("신청 중 오류가 발생했습니다. 카카오톡으로 문의해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* 백드롭 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 내용 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 my-8 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          무료 체험 신청
        </h2>
        <p className="text-gray-600 mb-6">
          매장 정보를 입력해주시면 빠르게 연락드리겠습니다
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="storeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              매장명 *
            </label>
            <input
              type="text"
              id="storeName"
              required
              value={formData.storeName}
              onChange={(e) =>
                setFormData({ ...formData, storeName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="예: 맛있는 치킨집"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              연락처 *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="010-0000-0000"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              문의사항 (선택)
            </label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="궁금한 점이 있으시면 자유롭게 작성해주세요"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={isPrivacyChecked}
                onCheckedChange={(checked) =>
                  setIsPrivacyChecked(checked as boolean)
                }
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="privacy"
                  className="text-sm text-gray-600 cursor-pointer inline"
                >
                  <span className="text-red-500">*</span>{" "}
                  <button
                    type="button"
                    onClick={() => setShowLegalModal(true)}
                    className="text-brand-500 underline hover:text-brand-600"
                  >
                    개인정보 수집 및 이용
                  </button>
                  에 동의합니다
                </label>
                {!isPrivacyChecked &&
                  formData.storeName &&
                  formData.phone && (
                    <p className="text-xs text-red-500 mt-1">
                      개인정보 수집 및 이용에 동의해주세요.
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 px-4 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
            >
              {isSubmitting ? "신청 중..." : "무료 체험 신청"}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            또는{" "}
            <a
              href="https://open.kakao.com/o/sCpB58Hh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:underline font-medium"
            >
              카카오톡으로 문의하기
            </a>
          </p>
        </div>
      </div>

      <LegalInfoModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
      />
    </div>
  );
};

export default ContactFormModal;
