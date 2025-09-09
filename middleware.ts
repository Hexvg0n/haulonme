import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers so we can set a new one
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);

  // Check for a session token in the cookies
  const sessionToken = request.cookies.get('session_token');

  // If the user is trying to access the admin area without a session, redirect to login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If the user is logged in and tries to visit the login page, redirect to the admin dashboard
  if (request.nextUrl.pathname.startsWith('/admin/login') && sessionToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}