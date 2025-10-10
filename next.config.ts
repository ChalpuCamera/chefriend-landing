import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSR 활성화 - Dynamic routing을 위해 export 제거
  // output: "export",

  // SEO 최적화를 위한 설정
  poweredByHeader: false,
  compress: true,

  // 성능 최적화
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-toast",
    ],
  },

  // 이미지 최적화
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // headers는 정적 export에서 작동하지 않으므로 주석 처리
  // Nginx 설정에서 직접 헤더를 설정해야 함

  // 웹팩 설정 제거 (기본 Next.js 최적화 사용)
};

export default nextConfig;
