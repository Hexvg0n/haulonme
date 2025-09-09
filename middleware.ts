import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// FIX: Corrected the typo from 'jos' to 'jose'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('JWT_SECRET is not set in environment variables');
    // In a real app, you might want to return an error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the JWT
      await jwtVerify(sessionToken, new TextEncoder().encode(secret));
    } catch (error) {
      // If the token is invalid, redirect to the login page
      const loginUrl = new URL('/admin/login', request.url);
      // Clear the invalid cookie
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('session_token');
      return response;
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin/login') && sessionToken) {
    try {
      await jwtVerify(sessionToken, new TextEncoder().encode(secret));
      // If token is valid, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch (error) {
      // If the token is invalid, let them proceed to the login page but clear the bad cookie
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