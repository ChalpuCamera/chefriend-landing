import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/lib/GoogleAnalytics";
import { Suspense } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로딩중...</p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  // 페이지별 타이틀 템플릿 설정
  title: {
    template: "%s | 셰프랜드",
    default: "셰프랜드",
  },
  // 사이트 전체 공통 설정
  authors: [{ name: "셰프랜드 팀" }],
  creator: "셰프랜드",
  publisher: "셰프랜드",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.chefriend.kr"
  ),
  // 검색엔진 설정
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // 사이트 인증
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard Font */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link rel="preconnect" href="https://cdn.chefriend.com" />

        {/* DNS prefetch for non-critical resources */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* 브랜드 favicon.ico 파일 사용 */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* 환경변수 적용 안될 때 사용 */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta
          name="naver-site-verification"
          content={process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}
        />
        <GoogleAnalytics />
      </head>
      <body className="antialiased">
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
      </body>
    </html>
  );
}
