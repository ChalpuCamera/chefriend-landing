ㅂ# 정적 배포 가이드

## 설정 완료 사항

### 1. next.config.ts 설정
```typescript
output: "export"  // 정적 HTML 파일로 빌드
```

### 2. 현재 프로젝트는 정적 배포 가능
- ✅ 서버 사이드 기능 미사용 (getServerSideProps, getInitialProps 없음)
- ✅ Next.js Image 컴포넌트 사용 중 (정적 빌드 지원)
- ✅ 동적 라우팅 없음
- ✅ API Routes 없음

## 빌드 및 배포 방법

### 1. 로컬 빌드
```bash
# 프로젝트 빌드
npm run build

# 빌드된 정적 파일 확인
# out/ 폴더에 HTML, CSS, JS 파일이 생성됨
ls -la out/
```

### 2. 배포 플랫폼별 방법

#### A. GitHub Pages
```bash
# 1. GitHub 리포지토리에 푸시
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# 2. GitHub Settings > Pages 에서
# Source: Deploy from a branch
# Branch: main, /out 폴더 선택
```

#### B. Netlify
```bash
# 1. netlify.toml 파일 생성 (선택사항)
[build]
  command = "npm run build"
  publish = "out"

# 2. Netlify에서 GitHub 리포지토리 연결
# 3. Build command: npm run build
# 4. Publish directory: out
```

#### C. Vercel
```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel --prod

# 또는 GitHub 연결 후 자동 배포
```

#### D. AWS S3 + CloudFront
```bash
# 1. 빌드
npm run build

# 2. S3 버킷에 업로드
aws s3 sync out/ s3://your-bucket-name --delete

# 3. CloudFront 캐시 무효화
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### E. Nginx 서버
```bash
# 1. 빌드
npm run build

# 2. 서버에 업로드
scp -r out/* user@server:/var/www/html/

# 3. Nginx 설정 예시
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;

    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    # 정적 자산 캐싱
    location /_next/static {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

## 환경변수 설정

정적 배포 시 빌드 타임에 환경변수가 포함되므로 주의:

```bash
# .env.production 파일
NEXT_PUBLIC_SITE_URL=https://www.chefriend.com
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_public_key
```

## 배포 전 체크리스트

1. **환경변수 확인**
   ```bash
   cat .env.production
   ```

2. **빌드 테스트**
   ```bash
   npm run build
   ```

3. **정적 파일 로컬 테스트**
   ```bash
   npx serve out -p 3000
   ```

4. **SEO 메타데이터 확인**
   - robots.txt
   - sitemap.xml
   - og-image.jpg

## 주의사항

1. **Image 최적화**: 정적 빌드 시 Next.js Image 컴포넌트는 빌드 시점에 최적화됨
2. **동적 기능 제한**: 서버 사이드 기능, API Routes, 미들웨어 사용 불가
3. **404 페이지**: 일부 호스팅 서비스는 404.html을 별도 설정 필요
4. **트레일링 슬래시**: 호스팅 서비스에 따라 URL 끝 슬래시 처리 다름

## 성능 최적화 팁

1. **CDN 사용**: CloudFlare, AWS CloudFront 등
2. **압축**: gzip/brotli 압축 활성화
3. **캐싱**: 정적 자산에 긴 캐시 기간 설정
4. **이미지 최적화**: WebP/AVIF 포맷 사용

## 문제 해결

### 빌드 실패 시
```bash
# 캐시 삭제 후 재빌드
rm -rf .next out node_modules
npm install
npm run build
```

### 404 에러 발생 시
- 파일 확장자 확인 (.html)
- 대소문자 구분 확인
- 호스팅 서비스의 라우팅 설정 확인