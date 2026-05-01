'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Header from "../Header.jsx";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        {session ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Welcome, {session.user.name}</h2>
            <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Sign in with Google</h2>
            <button
              onClick={() => signIn('google')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
}
