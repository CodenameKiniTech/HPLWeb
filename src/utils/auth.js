import { supabase } from './supabaseClient';

// Function to fetch the current user session
export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

// Function to redirect to login if no user is found
export const requireAuth = async () => {
  const session = await getSession();
  if (!session) {
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
    throw new Error('Not authenticated');
  }
  return session.user;
};

// Function to handle logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
};
