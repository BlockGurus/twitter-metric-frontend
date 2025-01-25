import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If there's no session and the user is trying to access a protected route
    if (!session && (
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/api/twitter')
    )) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error, redirect to sign in as a fallback
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/twitter/:path*',
  ],
};