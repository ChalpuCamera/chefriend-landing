import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOProps): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.chefriend.kr";
  const defaultTitle = "셰프랜드 | 사장님을 위한 진짜 고객 피드백 솔루션";
  const defaultDescription =
    "별점 테러 걱정 없이! 비공개 솔직 피드백으로 메뉴를 개선하고 매출을 증대하세요. 데이터 기반의 구체적인 개선 방향을 제시합니다.";

  const seoTitle = title ? `${title} | 셰프랜드` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || [
    "음식점 피드백",
    "고객 평가",
    "비공개 리뷰",
    "메뉴 개선",
    "매출 증대",
  ];
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const seoOgImage = ogImage || "/og-image.jpg";

  // other 객체 생성 시 undefined 값 필터링
  const otherMeta: Record<string, string> = {};
  if (author) otherMeta["article:author"] = author;
  if (section) otherMeta["article:section"] = section;
  if (tags) otherMeta["article:tag"] = tags.join(",");

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: author ? [{ name: author }] : [{ name: "셰프랜드 팀" }],
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: fullCanonicalUrl,
      siteName: "셰프랜드",
      images: [
        {
          url: seoOgImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: "ko_KR",
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoOgImage],
    },
    other: otherMeta,
  };
}

// 자주 사용되는 SEO 패턴들
export const seoPatterns = {
  homepage: {
    title: "별점 테러 걱정 없는 진짜 고객 피드백 솔루션",
    description:
      "비공개 환경에서 솔직한 피드백을 수집하고, 데이터 기반으로 메뉴를 개선하여 매출을 증대시키세요.",
    keywords: [
      "고객 피드백",
      "사장님 솔루션",
      "비공개 리뷰",
      "매출 증대",
    ],
  },
  features: {
    title: "셰프랜드 주요 기능",
    description:
      "완전 비공개 피드백 환경, 데이터 분석, 구체적인 개선 방향 제시",
    keywords: ["비공개 피드백", "데이터 분석", "매출 증대", "메뉴 개선"],
  },
  pricing: {
    title: "셰프랜드 요금제",
    description: "사장님을 위한 합리적인 가격의 피드백 솔루션",
    keywords: ["요금제", "가격", "사장님", "피드백 솔루션"],
  },
};
