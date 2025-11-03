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
  label?: string; // 백엔드에서 받은 label 또는 customLabel
  onClick?: () => void;
  className?: string;
}

export function LinkButton({
  linkType,
  url,
  label,
  onClick,
  className = "",
}: LinkButtonProps) {
  // Instagram의 경우 URL에서 아이디 추출
  const getInstagramUsername = (instagramUrl: string): string => {
    if (!instagramUrl) return "인스타그램";

    // @username 형태인 경우
    if (instagramUrl.startsWith("@")) {
      return instagramUrl;
    }

    // URL 형태인 경우 username 추출
    try {
      const urlPatterns = [
        /instagram\.com\/([^\/\?]+)/i,
        /instagr\.am\/([^\/\?]+)/i,
      ];

      for (const pattern of urlPatterns) {
        const match = instagramUrl.match(pattern);
        if (match && match[1]) {
          return `@${match[1]}`;
        }
      }
    } catch (e) {
      // URL 파싱 실패 시
    }

    // 패턴에 매칭되지 않으면 원본 반환 (@ 추가)
    return instagramUrl.startsWith("@") ? instagramUrl : `@${instagramUrl}`;
  };

  const displayLabel =
    linkType === "INSTAGRAM"
      ? label || getInstagramUsername(url)
      : label || defaultLabels[linkType];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      let fullUrl;

      if (url.startsWith("http")) {
        fullUrl = url;
      } else if (linkType === "INSTAGRAM") {
        fullUrl = `https://instagram.com/${url}`;
      } else {
        fullUrl = `https://${url}`;
      }

      window.open(fullUrl, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-full flex items-center gap-3 px-4 py-3 bg-[#7790AC] text-white rounded-lg hover:opacity-90 transition-opacity ${className}`}
    >
      <Image
        src={platformIcons[linkType]}
        alt={displayLabel}
        width={32}
        height={32}
        className="relative z-10 flex-shrink-0 w-8 h-8 rounded-lg"
      />
      <span className="absolute inset-x-0 flex justify-center items-center h-full font-bold text-body-sb">
        {displayLabel}
      </span>
    </button>
  );
}

// Export LinkType for use in other components
export type { LinkType };
