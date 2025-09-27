import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 사이트 생성 설정
  output: "export",

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

  // 이미지 최적화 - 정적 export를 위해 unoptimized 설정
  images: {
    unoptimized: true,
  },

  // headers는 정적 export에서 작동하지 않으므로 주석 처리
  // Nginx 설정에서 직접 헤더를 설정해야 함

  // 웹팩 최적화
  webpack: (config, { dev }) => {
    // 개발 모드에서는 기본 설정 사용 (MIME type 문제 방지)
    if (dev) {
      return config;
    }

    // 프로덕션에서만 번들 최적화 적용
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/].*\.js$/,
            name: "vendors",
            chunks: "all",
          },
          styles: {
            test: /\.css$/,
            name: "styles",
            chunks: "all",
            enforce: true,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
        },
      },
    };

    return config;
  },
};

export default nextConfig;
