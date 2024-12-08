'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';
import { getSession } from '@/utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession(); // Check if user is already logged in
      if (session) {
        window.location.href = '/pages/dashboard'; // Redirect authenticated users
      } else {
        setLoading(false); // Only show the page after confirming the user is not logged in
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = '/pages/dashboard'; // Redirect to dashboard on successful login
  };

  if (loading) {
    // Show a blank screen or spinner while checking authentication
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-lg font-bold mb-4">Login</h2>
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
        <p className="mt-4">
          Don't have an account?{' '}
          <Link href="/auth/signup">
            <span className="text-blue-500 underline cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
