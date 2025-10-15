/**
 * 사용자 세션 추적 유틸리티
 *
 * 랜딩페이지에서 버튼 클릭 및 페이지 이동을 추적하기 위한 세션 ID 관리
 */

const SESSION_STORAGE_KEY = 'chefriend_session_id';

/**
 * 고유한 세션 ID 생성
 * 형식: timestamp-randomString (예: "1705312345678-k9x2m5p8q1")
 *
 * @returns 고유한 세션 ID
 */
export function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}

/**
 * localStorage에서 세션 ID를 가져오거나, 없으면 새로 생성
 * 브라우저를 닫아도 세션 ID가 유지되어 며칠에 걸친 사용자 여정 추적 가능
 *
 * @returns 세션 ID (브라우저 환경이 아니면 빈 문자열)
 */
export function getOrCreateSessionId(): string {
  // SSR 환경에서는 빈 문자열 반환
  if (typeof window === 'undefined') return '';

  try {
    // localStorage에서 기존 세션 ID 조회
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    // 세션 ID가 없으면 새로 생성
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);

      if (process.env.NODE_ENV === 'development') {
        console.log('[Session Tracking] New session ID created:', sessionId);
      }
    }

    return sessionId;
  } catch (error) {
    // localStorage 접근 실패 시 (개인정보 보호 모드 등)
    console.error('[Session Tracking] Failed to access localStorage:', error);
    return generateSessionId(); // 임시 세션 ID 반환
  }
}

/**
 * 현재 세션 ID 조회 (없어도 생성하지 않음)
 *
 * @returns 세션 ID 또는 null
 */
export function getSessionId(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('[Session Tracking] Failed to access localStorage:', error);
    return null;
  }
}

/**
 * 세션 ID 수동 삭제 (테스트/디버깅용)
 */
export function clearSessionId(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    if (process.env.NODE_ENV === 'development') {
      console.log('[Session Tracking] Session ID cleared');
    }
  } catch (error) {
    console.error('[Session Tracking] Failed to clear session ID:', error);
  }
}
