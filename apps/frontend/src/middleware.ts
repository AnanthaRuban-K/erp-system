

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/hr(.*)',
  '/finance(.*)',
  '/admin(.*)',
  '/api-test(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  if (isProtectedRoute(req) && !userId) {
    // Redirect unauthenticated users to sign-in
    
  }
  // Allow the request to proceed
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}