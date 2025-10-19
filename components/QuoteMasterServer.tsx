import { headers } from 'next/headers';
import QuoteMasterClient from './QuoteMasterClient';

interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isPayingMember: boolean;
  user: User | null;
  error: string | null;
}

export default async function QuoteMasterServer() {
  const headersList = await headers();
  const authHeader = headersList.get('authorization');

  let authState: AuthState;

  if (!authHeader && process.env.NODE_ENV === 'development') {
    authState = {
      isAuthenticated: true,
      isPayingMember: true,
      user: { id: 'dev_user_123', name: 'Dev User', username: 'dev_user' },
      error: null,
    };
  } else if (!authHeader) {
    authState = {
      isAuthenticated: true,
      isPayingMember: true,
      user: { id: 'guest_user_123', name: 'Guest User', username: 'guest_user' },
      error: null,
    };
  } else {
    authState = {
      isAuthenticated: true,
      isPayingMember: true,
      user: { id: 'authenticated_user', name: 'Authenticated User', username: 'auth_user' },
      error: null,
    };
  }

  return <QuoteMasterClient authState={authState} />;
}
