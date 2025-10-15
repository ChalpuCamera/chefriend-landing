import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description:
    "셰프랜드 로그인 페이지입니다. 카카오 계정으로 간편하게 로그인하세요. 링크로 시작하는 가게 홍보, 무료로 회원가입하세요.",
  keywords: [
    "셰프랜드 로그인",
    "카카오 로그인",
    "회원가입",
    "가게 홍보",
    "음식점 마케팅",
  ],
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "로그인 - 셰프랜드",
    description: "셰프랜드 로그인 페이지입니다. 카카오 계정으로 간편하게 로그인하세요.",
    type: "website",
    locale: "ko_KR",
    url: "/login",
    siteName: "셰프랜드",
  },
  robots: {
    index: false, // 로그인 페이지는 검색엔진에 노출하지 않음
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
