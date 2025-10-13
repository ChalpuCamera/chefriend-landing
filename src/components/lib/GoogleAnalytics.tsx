"use client";

import Script from "next/script";

// gtag 전역 타입 선언
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  if (!GA_MEASUREMENT_ID) {
    console.warn('[GA4] NEXT_PUBLIC_GOOGLE_ANALYTICS 환경변수가 설정되지 않았습니다.');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        async
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            // 성능 최적화
            transport_type: 'beacon',
            // 개발 환경에서 디버그 모드 활성화
            debug_mode: ${process.env.NODE_ENV === 'development'}
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
