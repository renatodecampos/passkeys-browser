import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
  const start = Date.now();
  const method = request.method;
  const url = request.url;
  const headers = Object.fromEntries(request.headers.entries());

  console.log('Incoming request', {
    method,
    url,
    headers: {
      ...headers,
      // Remove sensitive headers
      authorization: headers.authorization ? '[REDACTED]' : undefined,
      cookie: headers.cookie ? '[REDACTED]' : undefined,
    },
  });

  const response = NextResponse.next();

  response.headers.set('X-Request-ID', crypto.randomUUID());

  const end = Date.now();
  const duration = end - start;

  console.log('Request completed', {
    method,
    url,
    status: response.status,
    duration: `${duration}ms`,
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 