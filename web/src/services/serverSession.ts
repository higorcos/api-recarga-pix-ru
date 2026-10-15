import { cookies } from 'next/headers';
import { decodeToken, Session, TOKEN_COOKIE } from './session';

// Sessão nos componentes de servidor (páginas async)
export function getServerSession(): Session | null {
  const token = cookies().get(TOKEN_COOKIE)?.value;
  return token ? decodeToken(token) : null;
}
