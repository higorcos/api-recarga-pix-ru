import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|icons).*)',
}

const publicRoutes = ['/login'];

// Sem o cookie do token, redireciona para o login. A validade do token é conferida pela API.
export function middleware(req: NextRequest){

    const pathname = req.nextUrl.pathname;

    if(publicRoutes.includes(pathname)){
        return NextResponse.next();
    }

    if(!req.cookies.get('token')){
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
