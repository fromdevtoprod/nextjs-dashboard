import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

// Notice this is only an object, not a full Auth.js instance
export default {
  callbacks: {
    authorized: async ({ auth, request }) => {
      console.log('auth', auth);
      console.log('request.nextUrl.pathname', request.nextUrl.pathname);
      if (request.nextUrl.pathname === '/') {
        return true;
      }
      if (!auth && request.nextUrl.pathname !== '/login') {
        const newUrl = new URL('/login', request.nextUrl.origin);
        return Response.redirect(newUrl);
      }
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [Google],
} satisfies NextAuthConfig;
