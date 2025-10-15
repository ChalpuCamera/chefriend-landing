/**
 * 버튼 클릭 추적 API
 *
 * 랜딩페이지 및 로그인 페이지의 버튼 클릭을 백엔드에 기록
 */

import { getOrCreateSessionId } from '@/lib/tracking';

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * 버튼 타입 정의
 */
export type ButtonType = 'START_FREE' | 'KAKAO_LOGIN' | 'LOGIN';

/**
 * 버튼 로그 요청 타입
 */
interface ButtonLogRequest {
  sessionId: string;
  buttonType: ButtonType;
}

/**
 * 버튼 클릭 로그를 백엔드에 전송
 *
 * @param buttonType - 클릭한 버튼 타입
 *
 * 사용 예시:
 * ```typescript
 * // "무료로 시작하기" 버튼 클릭 시
 * logButtonClick('START_FREE');
 *
 * // "로그인" 링크 클릭 시
 * logButtonClick('LOGIN');
 *
 * // "카카오로 로그인하기" 버튼 클릭 시
 * logButtonClick('KAKAO_LOGIN');
 * ```
 */
export async function logButtonClick(buttonType: ButtonType): Promise<void> {
  // 브라우저 환경이 아니면 실행하지 않음
  if (typeof window === 'undefined') return;

  // API URL 확인
  if (!API_URL) {
    console.warn('[Button Tracking] API_URL is not configured');
    return;
  }

  try {
    // 세션 ID 가져오기/생성
    const sessionId = getOrCreateSessionId();

    if (!sessionId) {
      console.warn('[Button Tracking] Session ID is empty');
      return;
    }

    // 요청 데이터
    const requestData: ButtonLogRequest = {
      sessionId,
      buttonType,
    };

    // 개발 환경에서 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('[Button Tracking] Logging button click:', requestData);
    }

    // API 호출
    const response = await fetch(`${API_URL}/api/landing/button-log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(
        `[Button Tracking] API error: ${response.status}`,
        errorText
      );
      return;
    }

    // 개발 환경에서 성공 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('[Button Tracking] Successfully logged:', buttonType);
    }
  } catch (error) {
    // 에러 발생 시 조용히 실패 (사용자 경험 방해 금지)
    console.error('[Button Tracking] Failed to log button click:', error);
  }
}