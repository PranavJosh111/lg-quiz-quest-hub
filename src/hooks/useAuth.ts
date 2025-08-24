import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string | null;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthUser {
  user: User;
  profile: UserProfile;
  displayName: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Cast to any to bypass type checking since types.ts is empty
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as UserProfile;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user, session: data.session };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cleanupAuthState = () => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const signOut = async () => {
    try {
      console.log('Starting logout process...');
      setError(null);
      
      // Clean up auth state first
      console.log('Cleaning up auth state...');
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        console.log('Attempting global signout...');
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Global signout successful');
      } catch (err) {
        // Continue even if this fails
        console.warn('Global signout failed, continuing with cleanup', err);
      }
      
      // Clear local state
      console.log('Clearing local state...');
      setUser(null);
      setProfile(null);
      setSession(null);
      
      console.log('Logout complete, redirecting...');
      // Force redirect to login after logout
      window.location.href = '/';
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message);
      // Even if there's an error, force redirect to login
      window.location.href = '/';
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to prevent deadlocks
          setTimeout(async () => {
            try {
              const userProfile = await fetchUserProfile(session.user.id);
              setProfile(userProfile);
            } catch (err) {
              console.error('Failed to fetch user profile:', err);
              setError('Failed to load user profile');
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id)
          .then(setProfile)
          .catch((err) => {
            console.error('Failed to fetch user profile:', err);
            setError('Failed to load user profile');
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    profile,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    authUser: user && profile ? { 
      user, 
      profile, 
      displayName: user.email?.split('@')[0] || 'User',
      email: user.email || ''
    } : null,
  };
};