import Image from "next/image";
import { LinkType } from "@/lib/types/store";

const platformIcons: Record<LinkType, string> = {
  NAVER_MAP: "/naver.png",
  KAKAO_MAP: "/kakaomap.png",
  YOGIYO: "/yogiyo.png",
  BAEMIN: "/baemin.png",
  COUPANGEATS: "/coupangeats.png",
  KAKAO_TALK: "/kakaotalk.png",
  INSTAGRAM: "/instagram.png",
  DDANGYO: "/ddangyo.png",
  GOOGLE_MAPS: "/googlemaps.png",
  DAANGN: "/daangn.png",
  CUSTOM: "/link.png",
};

const defaultLabels: Record<LinkType, string> = {
  NAVER_MAP: "네이버 지도",
  KAKAO_MAP: "카카오맵",
  YOGIYO: "요기요",
  BAEMIN: "배달의민족",
  COUPANGEATS: "쿠팡이츠",
  KAKAO_TALK: "카카오톡",
  INSTAGRAM: "인스타그램",
  DDANGYO: "땡겨요",
  GOOGLE_MAPS: "구글맵",
  DAANGN: "당근마켓",
  CUSTOM: "",
};

interface LinkButtonProps {
  linkType: LinkType;
  url: string;
  label?: string;  // 백엔드에서 받은 label 또는 customLabel
  onClick?: () => void;
  className?: string;
}

export function LinkButton({ linkType, url, label, onClick, className = "" }: LinkButtonProps) {
  const displayLabel = label || defaultLabels[linkType];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-3 bg-[#7790AC] text-white rounded-lg hover:opacity-90 transition-opacity ${className}`}
    >
      <Image
        src={platformIcons[linkType]}
        alt={displayLabel}
        width={24}
        height={24}
        className="flex-shrink-0"
      />
      <span className="font-medium text-base">{displayLabel}</span>
    </button>
  );
}

// Export LinkType for use in other components
export type { LinkType };
