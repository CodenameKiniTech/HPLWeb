'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert('Check your email for the confirmation link!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
        <h2 className="text-lg font-bold mb-4">Sign Up</h2>
        <input
          className="p-2 mb-3 w-full border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="p-2 mb-3 w-full border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Sign Up</button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {/* Navigation to Login */}
        <p className="mt-4">
          Already have an account?{' '}
          <Link href="/auth/login">
            <span className="text-blue-500 underline cursor-pointer">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
