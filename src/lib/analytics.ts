/**
 * Google Analytics 4 (GA4) 이벤트 추적 유틸리티
 *
 * 사용 예시:
 * ```typescript
 * import { trackButtonClick, trackPageView } from '@/lib/analytics';
 *
 * // 버튼 클릭 추적
 * trackButtonClick('cta_button', 'slide_1');
 *
 * // 커스텀 이벤트 추적
 * trackEvent('custom_event', { param1: 'value1' });
 * ```
 */

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

/**
 * gtag 함수 호출 (Google Analytics)
 */
const gtag = (
  command: 'config' | 'event' | 'js' | 'set',
  targetId: string | Date,
  config?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetId, config);
  }
};

/**
 * 커스텀 이벤트 추적
 * @param eventName - 이벤트 이름 (예: 'button_click', 'form_submit')
 * @param eventParams - 이벤트 파라미터 객체
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (typeof window === 'undefined') return;

  try {
    gtag('event', eventName, eventParams);

    // 개발 환경에서 콘솔 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4 Event]', eventName, eventParams);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * 버튼 클릭 이벤트 추적
 * @param buttonName - 버튼 이름/ID
 * @param buttonLocation - 버튼 위치 (예: 'header', 'footer', 'slide_1')
 * @param additionalParams - 추가 파라미터
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation?: string,
  additionalParams?: Record<string, string | number | boolean>
) => {
  trackEvent('button_click', {
    button_name: buttonName,
    ...(buttonLocation && { button_location: buttonLocation }),
    ...additionalParams,
  });
};

/**
 * CTA 버튼 클릭 추적 (슬라이드별 개별 이벤트)
 * @param slideNumber - 슬라이드 번호 (1, 2, 3)
 * @param buttonText - 버튼 텍스트
 */
export const trackCtaClick = (slideNumber: number, buttonText: string) => {
  // 슬라이드별로 다른 이벤트 이름 사용
  const eventName = `cta_slide${slideNumber}_click`;

  trackEvent(eventName, {
    slide_number: slideNumber,
    button_text: buttonText,
    event_category: 'engagement',
    event_label: `slide_${slideNumber}_cta`,
  });
};

/**
 * 랜딩페이지 로그인 링크 클릭 추적
 * @param location - 클릭 위치
 */
export const trackLandingLoginLinkClick = (location: string = 'landing_page_bottom') => {
  trackEvent('landing_login_link_click', {
    click_location: location,
    event_category: 'authentication',
    event_label: 'landing_login_link',
  });
};

/**
 * 카카오 로그인 버튼 클릭 추적
 * @param location - 클릭 위치
 */
export const trackKakaoLoginClick = (location: string = 'login_page') => {
  trackEvent('kakao_login_button_click', {
    login_type: 'kakao',
    click_location: location,
    event_category: 'authentication',
    event_label: 'kakao_oauth_login',
  });
};

/**
 * 로그인 링크/버튼 클릭 추적 (일반)
 * @param loginType - 로그인 타입 (예: 'kakao', 'google', 'email')
 * @param location - 클릭 위치 (예: 'landing_page', 'header')
 */
export const trackLoginClick = (
  loginType: string,
  location: string = 'unknown'
) => {
  trackEvent('login_click', {
    login_type: loginType,
    click_location: location,
    event_category: 'authentication',
    event_label: `${loginType}_login`,
  });
};

/**
 * 페이지뷰 추적 (Next.js App Router에서는 자동으로 처리됨)
 * @param pagePath - 페이지 경로
 * @param pageTitle - 페이지 제목
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window === 'undefined') return;

  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
  });
};

/**
 * 외부 링크 클릭 추적
 * @param url - 외부 링크 URL
 * @param linkText - 링크 텍스트
 */
export const trackOutboundClick = (url: string, linkText?: string) => {
  trackEvent('outbound_click', {
    link_url: url,
    ...(linkText && { link_text: linkText }),
    event_category: 'outbound',
  });
};

/**
 * 폼 제출 추적
 * @param formName - 폼 이름
 * @param formId - 폼 ID
 */
export const trackFormSubmit = (formName: string, formId?: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...(formId && { form_id: formId }),
    event_category: 'form',
  });
};

/**
 * 검색 이벤트 추적
 * @param searchTerm - 검색어
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
    event_category: 'engagement',
  });
};

/**
 * 스크롤 깊이 추적
 * @param percentage - 스크롤 퍼센티지 (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
    event_category: 'engagement',
  });
};

const analyticsExports = {
  trackEvent,
  trackButtonClick,
  trackCtaClick,
  trackLandingLoginLinkClick,
  trackKakaoLoginClick,
  trackLoginClick,
  trackPageView,
  trackOutboundClick,
  trackFormSubmit,
  trackSearch,
  trackScrollDepth,
};

export default analyticsExports;
