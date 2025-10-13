import type { Metadata } from "next";
import LandingSlider from "@/components/landing/LandingSlider";

export const metadata: Metadata = {
  title: "셰프랜드 | 사장님의 영원한 단짝",
  description:
    "웹사이트를 만들고 가게를 관리해보세요",
  keywords: [
    "음식점 피드백",
    "고객 평가",
    "비공개 리뷰",
    "메뉴 개선",
    "매출 증대",
    "사장님 솔루션",
    "선주문 피드백",
    "데이터 분석",
    "음식점 컨설팅",
    "셰프랜드",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "셰프랜드",
    description:
      "웹사이트를 만들고 가게를 관리해보세요",
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "셰프랜드",
    images: [
      {
        url: "/landing1.png",
        width: 1200,
        height: 630,
        alt: "chefriend - 사장님을 위한 진짜 고객 피드백 솔루션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "셰프랜드",
    description:
      "웹사이트를 만들고 가게를 관리해보세요",
    images: ["/landing1.png"],
  },
};

// 서버 컴포넌트 - SSR로 렌더링
export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.chefriend.com/#website",
        url: "https://www.chefriend.com/",
        name: "셰프랜드",
        description: "사장님을 위한 진짜 고객 피드백 솔루션",
        publisher: {
          "@id": "https://www.chefriend.com/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://www.chefriend.com/?s={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "ko-KR",
      },
      {
        "@type": "Organization",
        "@id": "https://www.chefriend.com/#organization",
        name: "셰프랜드",
        url: "https://www.chefriend.com/",
        logo: {
          "@type": "ImageObject",
          inLanguage: "ko-KR",
          "@id": "https://www.chefriend.com/#/schema/logo/image/",
          url: "https://www.chefriend.com/landing1.png",
          contentUrl: "https://www.chefriend.com/logo.png",
          width: 512,
          height: 512,
          caption: "셰프랜드",
        },
        image: {
          "@id": "https://www.chefriend.com/#/schema/logo/image/",
        },
        sameAs: [],
      },
      {
        "@type": "Service",
        "@id": "https://www.chefriend.com/#service",
        name: "셰프랜드 피드백 솔루션",
        description:
          "고객의 진짜 목소리로 사장님의 매출을 올려드려요. 비공개 솔직 피드백으로 메뉴를 개선하고 매출을 증대하세요.",
        provider: {
          "@id": "https://www.chefriend.com/#organization",
        },
        areaServed: "KR",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "셰프랜드 서비스",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "완전 비공개 안전한 피드백 환경",
                description:
                  "별점 테러 걱정 없이 사장님만 볼 수 있는 안전한 피드백 수집",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "구체적이고 실행 가능한 데이터 분석",
                description:
                  "맛·양·가격 정량화로 명확한 개선방향 제시와 데이터 기반 의사결정 지원",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen">
        <LandingSlider />
      </main>
    </>
  );
}
