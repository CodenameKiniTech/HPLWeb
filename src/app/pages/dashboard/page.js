'use client';

import { useEffect, useState } from 'react';
import { requireAuth, logout } from '@/utils/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await requireAuth();
        setUser(currentUser);
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.email}</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
