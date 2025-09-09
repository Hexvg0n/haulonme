import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    console.error('JWT_SECRET is not set or is not strong enough. It must be at least 32 characters long.');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const protectedPaths = ['/admin'];
  const isProtectedPath = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p));

  if (isProtectedPath && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(sessionToken, new TextEncoder().encode(secret));
    } catch (error) {
      const loginUrl = new URL('/admin/login', request.url);
      const from = request.nextUrl.pathname;
      if (from && from.startsWith('/')) {
        loginUrl.searchParams.set('from', from);
      }
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('session_token');
      return response;
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin/login') && sessionToken) {
    try {
      await jwtVerify(sessionToken, new TextEncoder().encode(secret));
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch (error) {
      const response = NextResponse.next();
      response.cookies.delete('session_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}