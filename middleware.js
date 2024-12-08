import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect authenticated routes
  const publicRoutes = ['/auth/login', '/auth/signup'];
  const session = await supabase.auth.getSession();

  if (publicRoutes.includes(pathname) && session?.data?.session) {
    return NextResponse.redirect(new URL('/pages/dashboard', req.url));
  }

  return NextResponse.next();
}
