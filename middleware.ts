import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && request.nextUrl.pathname !== '/signin' && request.nextUrl.pathname !== '/signup'){
        // If the user is not authenticated and trying to access a protected route, redirect to the sign-in page
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    if(session && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup')){
        // If the user is authenticated and trying to access the sign-in or signup page, redirect to the home page
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/(.*)',
}