# Google Analytics 4 (GA4) 설정 가이드

## 목차
1. [GA4 새 속성 만들기](#1-ga4-새-속성-만들기)
2. [환경변수 설정](#2-환경변수-설정)
3. [이벤트 추적 확인](#3-이벤트-추적-확인)
4. [추적 중인 이벤트 목록](#4-추적-중인-이벤트-목록)
5. [커스텀 이벤트 추가 방법](#5-커스텀-이벤트-추가-방법)

---

## 1. GA4 새 속성 만들기

### 1-1. Google Analytics 속성 생성

1. **Google Analytics 접속**
   - [Google Analytics](https://analytics.google.com) 방문
   - Google 계정으로 로그인

2. **속성 만들기**
   - 왼쪽 하단 **관리(톱니바퀴 아이콘)** 클릭
   - **계정** 선택 (없으면 새로 만들기)
   - **속성** 열에서 **+ 속성 만들기** 클릭

3. **속성 정보 입력**
   ```
   속성 이름: 셰프랜드 랜딩페이지
   시간대: 대한민국 (GMT+09:00) 서울
   통화: 한국 원 (KRW)
   ```
   - **다음** 클릭

4. **비즈니스 정보 입력**
   ```
   업종: 기술 > 소프트웨어
   비즈니스 규모: 소규모: 직원 1~10명
   사용 목적: 웹사이트 성과 측정 체크
   ```
   - **만들기** 클릭

### 1-2. 데이터 스트림 생성

1. **플랫폼 선택**
   - "데이터 수집 시작" 화면에서 **웹** 선택

2. **스트림 설정**
   ```
   웹사이트 URL: https://www.chefriend.kr
   스트림 이름: 셰프랜드 웹사이트
   ```
   - **향상된 측정** 토글 켜기 (자동 스크롤, 검색, 동영상 참여 등 추적)
   - **스트림 만들기** 클릭

3. **측정 ID 복사**
   - 생성된 스트림 페이지에서 **측정 ID** 확인
   - 형식: `G-XXXXXXXXXX`
   - 이 ID를 복사해두세요!

---

## 2. 환경변수 설정

### 2-1. 로컬 환경 (.env.local)

`.env.local` 파일을 열고 기존 GA ID를 새로운 측정 ID로 교체하세요:

```bash
# 기존
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-4S4Y8G91RJ

# 새로운 측정 ID로 변경
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### 2-2. 프로덕션 환경

배포 플랫폼(Vercel, AWS, 등)의 환경변수 설정에 동일하게 추가:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

**Vercel 예시:**
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. `NEXT_PUBLIC_GOOGLE_ANALYTICS` 키 추가
4. 새 측정 ID 값 입력
5. Production, Preview, Development 모두 체크
6. Save

### 2-3. 환경변수 적용 확인

```bash
# 개발 서버 재시작
npm run dev
```

브라우저 콘솔에서 확인:
```javascript
// 개발 환경에서는 이벤트 로그가 출력됩니다
// [GA4 Event] button_click { button_name: '...', ... }
```

---

## 3. 이벤트 추적 확인

### 3-1. 실시간 보고서 확인

1. **Google Analytics 대시보드**
   - 왼쪽 메뉴에서 **보고서** → **실시간** 클릭

2. **테스트 진행**
   - 로컬 또는 프로덕션 사이트 접속
   - 버튼 클릭 등 이벤트 발생시키기
   - 30초~1분 내에 실시간 보고서에 나타남

3. **확인 항목**
   - 실시간 사용자 수
   - 이벤트 이름 (예: `button_click`, `cta_button_click`)
   - 이벤트 파라미터

### 3-2. 디버그 모드 (개발 환경)

개발 환경에서는 자동으로 디버그 모드가 활성화됩니다.

**브라우저 콘솔 확인:**
```javascript
// 슬라이드 1 CTA 버튼 클릭 시
[GA4 Event] cta_slide1_click {
  slide_number: 1,
  button_text: "무료로 시작하기",
  event_category: "engagement",
  event_label: "slide_1_cta"
}

// 슬라이드 2 CTA 버튼 클릭 시
[GA4 Event] cta_slide2_click {
  slide_number: 2,
  button_text: "지금 만들어보기",
  event_category: "engagement",
  event_label: "slide_2_cta"
}

// 랜딩 로그인 링크 클릭 시
[GA4 Event] landing_login_link_click {
  click_location: "landing_page_bottom",
  event_category: "authentication",
  event_label: "landing_login_link"
}

// 카카오 로그인 버튼 클릭 시
[GA4 Event] kakao_login_button_click {
  login_type: "kakao",
  click_location: "login_page",
  event_category: "authentication",
  event_label: "kakao_oauth_login"
}
```

### 3-3. Chrome 확장 프로그램 사용

**Google Analytics Debugger 설치:**
1. [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) 설치
2. 확장 프로그램 아이콘 클릭하여 활성화
3. 브라우저 콘솔에서 상세한 GA 로그 확인

---

## 4. 추적 중인 이벤트 목록

현재 프로젝트에서 추적하는 이벤트 (**각 버튼마다 고유한 이벤트 이름 사용**):

### 4-1. 랜딩 페이지 (`/`)

| 이벤트 이름 | 발생 위치 | 파라미터 | 설명 |
|------------|---------|----------|------|
| `cta_slide1_click` | 슬라이드 1 CTA 버튼 | `slide_number`: 1<br>`button_text`: "무료로 시작하기"<br>`event_category`: "engagement"<br>`event_label`: "slide_1_cta" | 슬라이드 1의 "무료로 시작하기" 버튼 클릭 |
| `cta_slide2_click` | 슬라이드 2 CTA 버튼 | `slide_number`: 2<br>`button_text`: "지금 만들어보기"<br>`event_category`: "engagement"<br>`event_label`: "slide_2_cta" | 슬라이드 2의 "지금 만들어보기" 버튼 클릭 |
| `cta_slide3_click` | 슬라이드 3 CTA 버튼 | `slide_number`: 3<br>`button_text`: "무료로 제작하기"<br>`event_category`: "engagement"<br>`event_label`: "slide_3_cta" | 슬라이드 3의 "무료로 제작하기" 버튼 클릭 |
| `landing_login_link_click` | 하단 로그인 링크 | `click_location`: "landing_page_bottom"<br>`event_category`: "authentication"<br>`event_label`: "landing_login_link" | 랜딩페이지 하단의 "로그인" 텍스트 링크 클릭 |

### 4-2. 로그인 페이지 (`/login`)

| 이벤트 이름 | 발생 위치 | 파라미터 | 설명 |
|------------|---------|----------|------|
| `kakao_login_button_click` | 카카오 로그인 버튼 | `login_type`: "kakao"<br>`click_location`: "login_page"<br>`event_category`: "authentication"<br>`event_label`: "kakao_oauth_login" | 카카오 로그인 버튼 클릭 (OAuth 인증 시작) |

### 4-3. 자동 추적 이벤트 (향상된 측정)

GA4의 향상된 측정 기능으로 자동 추적되는 이벤트:

- `page_view` - 페이지 조회
- `scroll` - 스크롤 (90% 도달 시)
- `click` - 외부 링크 클릭
- `file_download` - 파일 다운로드
- `video_start`, `video_progress` - 동영상 재생

---

## 5. 커스텀 이벤트 추가 방법

새로운 버튼이나 상호작용에 이벤트 추적을 추가하는 방법:

### 5-1. 기본 사용법

```typescript
import { trackEvent, trackButtonClick } from '@/lib/analytics';

// 1. 간단한 이벤트
const handleClick = () => {
  trackEvent('custom_event_name', {
    param1: 'value1',
    param2: 'value2',
  });
};

// 2. 버튼 클릭 이벤트
const handleButtonClick = () => {
  trackButtonClick('버튼이름', '버튼위치');
};
```

### 5-2. 실전 예시

**예시 1: 폼 제출 추적**
```typescript
import { trackFormSubmit } from '@/lib/analytics';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 폼 제출 이벤트 추적
  trackFormSubmit('문의하기 폼', 'contact-form');

  // 실제 폼 제출 로직
  await submitForm(formData);
};
```

**예시 2: 외부 링크 클릭 추적**
```typescript
import { trackOutboundClick } from '@/lib/analytics';

<a
  href="https://external-site.com"
  onClick={() => trackOutboundClick('https://external-site.com', '제휴사 링크')}
>
  외부 사이트 방문
</a>
```

**예시 3: 검색 이벤트 추적**
```typescript
import { trackSearch } from '@/lib/analytics';

const handleSearch = (searchTerm: string) => {
  trackSearch(searchTerm);
  // 검색 실행 로직
};
```

### 5-3. 새 추적 함수 만들기

`src/lib/analytics.ts`에 새 함수 추가:

```typescript
/**
 * 메뉴 클릭 추적
 */
export const trackMenuClick = (menuName: string, menuCategory: string) => {
  trackEvent('menu_click', {
    menu_name: menuName,
    menu_category: menuCategory,
    event_category: 'navigation',
  });
};
```

---

## 6. GA4 커스텀 이벤트 설정

추적한 이벤트를 GA4에서 더 잘 활용하려면:

### 6-1. 맞춤 측정기준 만들기

1. GA4 관리 → 맞춤 정의 → **맞춤 측정기준 만들기**
2. 예시:
   ```
   측정기준 이름: 슬라이드 번호
   범위: 이벤트
   이벤트 파라미터: slide_number
   ```

### 6-2. 전환 이벤트 설정

중요한 이벤트를 전환으로 표시:

1. GA4 → 관리 → 이벤트
2. 추적 중인 이벤트 목록에서 다음 이벤트 찾기:
   - `cta_slide1_click` (슬라이드 1 CTA)
   - `cta_slide2_click` (슬라이드 2 CTA)
   - `cta_slide3_click` (슬라이드 3 CTA)
   - `kakao_login_button_click` (카카오 로그인)
3. 각 이벤트의 **전환으로 표시** 토글 켜기

**추천 전환 이벤트:**
- `cta_slide1_click` - 가장 중요한 CTA
- `kakao_login_button_click` - 회원가입/로그인 완료

---

## 7. 문제 해결

### 이벤트가 추적되지 않는 경우

**1. 환경변수 확인**
```bash
# 브라우저 콘솔에서 확인
console.log(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)
```

**2. gtag 로드 확인**
```javascript
// 브라우저 콘솔에서 확인
console.log(typeof window.gtag); // 'function'이어야 함
console.log(window.dataLayer); // 배열이어야 함
```

**3. 광고 차단기 확인**
- 광고 차단 확장 프로그램 (AdBlock, uBlock 등) 비활성화
- GA 스크립트가 차단될 수 있음

**4. 네트워크 확인**
- 브라우저 개발자 도구 → Network 탭
- `google-analytics.com` 또는 `googletagmanager.com` 요청 확인
- 상태 코드 200이어야 함

**5. 개발 서버 재시작**
```bash
# 환경변수 변경 후 반드시 재시작
npm run dev
```

---

## 8. 참고 자료

- [Google Analytics 4 공식 문서](https://support.google.com/analytics/answer/9304153)
- [GA4 이벤트 추적 가이드](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js에서 Google Analytics 사용하기](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## 9. 추가 기능 (선택사항)

### 사용자 속성 추적

```typescript
// src/lib/analytics.ts에 추가
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('set', 'user_properties', properties);
};

// 사용 예시
setUserProperties({
  user_type: 'owner',
  subscription_plan: 'free',
});
```

### 전자상거래 추적

```typescript
// 상품 조회
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
}) => {
  trackEvent('view_item', {
    currency: 'KRW',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
    }],
  });
};

// 구매 완료
export const trackPurchase = (transaction: {
  id: string;
  value: number;
  items: any[];
}) => {
  trackEvent('purchase', {
    transaction_id: transaction.id,
    currency: 'KRW',
    value: transaction.value,
    items: transaction.items,
  });
};
```

---

**문서 작성일:** 2025-01-13
**마지막 업데이트:** 2025-01-13
**작성자:** Claude
**프로젝트:** 셰프랜드 랜딩페이지
