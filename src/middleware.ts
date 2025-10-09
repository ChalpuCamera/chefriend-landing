import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 띄어쓰기(%20)가 포함된 URL을 하이픈(-)으로 리다이렉트
  if (pathname.includes('%20') || pathname.includes(' ')) {
    const newPathname = pathname.replace(/%20/g, '-').replace(/ /g, '-');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
