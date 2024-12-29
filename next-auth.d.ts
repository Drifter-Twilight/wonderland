import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /* Returned by `useAuth`, `getSession` and `getServerSession` */
  interface Session extends DefaultSession {
    user: {
      name: string
      avatar: string
      role: 'admin' | 'manager' | 'user'
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken` */
  interface JWT {
    sessionToken?: string
  }
}