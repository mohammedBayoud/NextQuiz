import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, removeUser, FakeUser } from '@/fakeAuth';

interface AuthContextType {
  user: FakeUser | null;
  loading: boolean;
  userRole: 'student' | 'teacher' | 'admin' | null;
  signOut: () => Promise<void>;
  setUser: (user: FakeUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FakeUser | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user in localStorage
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setUserRole(currentUser.role);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (e.g., when user logs in from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signOut = async () => {
    removeUser();
    setUser(null);
    setUserRole(null);
    navigate('/auth');
  };

  // Method to update user (called after login)
  const updateUser = (newUser: FakeUser) => {
    setUser(newUser);
    setUserRole(newUser.role);
  };

  return (
    <AuthContext.Provider value={{ user, loading, userRole, signOut, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
