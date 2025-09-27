#!/bin/bash

# 서버 정보 설정 (수정 필요)
SERVER_USER="username"
SERVER_IP="your-server-ip"
REMOTE_DIR="/var/www/chefriend"

echo "🚀 Chefriend 배포 시작..."

# 1. 로컬 빌드
echo "📦 프로젝트 빌드 중..."
npm run build

# 빌드 확인
if [ ! -d "out" ]; then
    echo "❌ 빌드 실패: out 폴더가 없습니다."
    exit 1
fi

echo "✅ 빌드 완료!"

# 2. 서버로 파일 전송
echo "📤 서버로 파일 전송 중..."
echo "   대상: $SERVER_USER@$SERVER_IP:$REMOTE_DIR"

# rsync로 효율적인 전송 (변경된 파일만 전송)
rsync -avz --delete out/ $SERVER_USER@$SERVER_IP:$REMOTE_DIR/

echo "✅ 배포 완료!"
echo "🌐 사이트를 확인하세요!"