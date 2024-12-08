'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';
import { getSession } from '@/utils/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        window.location.href = '/pages/dashboard';
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert('Check your email for the confirmation link!');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

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
