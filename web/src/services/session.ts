// Sessão do usuário: o JWT devolvido por POST /login fica no cookie "token",
// que é lido tanto pelos componentes de servidor quanto pelos de cliente.

export const TOKEN_COOKIE = 'token';

export interface Session {
  token: string;
  matriculation: string;
  name: string;
  role: number;
}

// Lê o payload do JWT sem validar a assinatura (quem valida é a API)
export function decodeToken(token: string): Session | null {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const data = JSON.parse(decodeURIComponent(escape(atob(payload))));
    return { token, matriculation: String(data.idUser), name: data.name, role: data.role };
  } catch {
    return null;
  }
}

export function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// Apenas no navegador
export function saveToken(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=86400; samesite=lax`;
}

export function clearToken() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function getClientSession(): Session | null {
  const cookie = document.cookie.split('; ').find((c) => c.startsWith(`${TOKEN_COOKIE}=`));
  return cookie ? decodeToken(cookie.slice(TOKEN_COOKIE.length + 1)) : null;
}
