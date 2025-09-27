# EmailJS 설정 가이드

## 1. EmailJS 계정 생성

1. [EmailJS](https://www.emailjs.com/) 접속
2. 무료 계정 생성 (월 200개 이메일 무료)

## 2. Email Service 설정

1. 대시보드 → Email Services 클릭
2. "Add New Service" 클릭
3. Gmail 선택 (또는 원하는 이메일 서비스)
4. Connect Account 클릭하여 Gmail 연결
5. Service ID 복사 → `.env.local`의 `NEXT_PUBLIC_EMAILJS_SERVICE_ID`에 입력

## 3. Email Template 생성

1. 대시보드 → Email Templates 클릭
2. "Create New Template" 클릭
3. 다음 내용으로 템플릿 작성:

### Subject (제목):

```
[chefriend] 무료 체험 신청 - {{store_name}}
```

### Content (내용):

```
새로운 무료 체험 신청이 접수되었습니다.

==============================
매장 정보
==============================
매장명: {{store_name}}
사장님 성함: {{owner_name}}
연락처: {{phone}}
이메일: {{email}}

문의사항:
{{message}}

==============================

빠른 연락 부탁드립니다.
```

### To Email:

```
chefrieend@gmail.com
```

4. Template ID 복사 → `.env.local`의 `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`에 입력

## 4. Public Key 설정

1. 대시보드 → Account → API Keys
2. Public Key 복사 → `.env.local`의 `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`에 입력

## 5. 환경변수 설정

`.env.local` 파일 생성:

```bash
cp .env.local.example .env.local
```

실제 값으로 수정:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

## 6. 테스트

1. 개발 서버 재시작: `npm run dev`
2. 웹사이트에서 "30일 무료로 우리 매장 진단받기" 클릭
3. 폼 작성 후 제출
4. chefrieend@gmail.com으로 이메일 수신 확인

## 대안: API Route 사용 (더 안전한 방법)

보안을 위해 서버사이드에서 이메일을 보내는 것이 더 안전합니다:

1. Resend, SendGrid, Nodemailer 등 사용
2. Next.js API Route 생성 (`/api/contact`)
3. 서버에서만 API 키 사용

필요하시면 API Route 방식으로도 구현 가능합니다.
