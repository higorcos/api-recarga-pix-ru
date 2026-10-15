import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

const publicRoutes = ['/login'];

export function middleware(req: NextRequest){

    const pathname = req.nextUrl.pathname;

    if(publicRoutes.includes(pathname)){
        return NextResponse.next();
    }
    
    // const session = null; //token
    // if(!session){
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }


    return NextResponse.next();
}



/*
// Função para definir um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Exemplo de uso:
setCookie("username", "joao", 30); // Define um cookie chamado "username" com valor "joao" que expira em 30 dias



*/