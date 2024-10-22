// components/SessionWrapper.js
'use client'; // Marks this component as a Client Component

import { SessionProvider } from 'next-auth/react';

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
