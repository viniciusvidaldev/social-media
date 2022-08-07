import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name?: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

interface IAuthCredentials {
  email: string;
  password: string;
}

interface ISignUpCredentials {
  email: string;
  password: string;
  name: string;
}

interface IAuthContext {
  signUp: (data: ISignUpCredentials) => Promise<void>;
  signIn: (data: IAuthCredentials) => Promise<void>;
  signOut: () => void;
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('social-media.token');

      if (token) {
        try {
          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          const userOnRefresh = await api.get('/user');
          setUser(userOnRefresh.data);
        } catch {
          signOut();
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const signUp = useCallback(async ({ email, password, name }: ISignUpCredentials) => {
    try {
      await api.post('/user/create', {
        email,
        password,
        name,
      });

      const { data: { token, user: userData } } = await api.post<AuthResponse>('/auth', {
        email,
        password,
      });

      localStorage.setItem('social-media.token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(userData);

      navigate('/');
    } catch (err: any) {
      console.log(err.response.data);
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: IAuthCredentials) => {
    try {
      const { data: { token, user: userData } } = await api.post<AuthResponse>('/auth', {
        email,
        password,
      });

      localStorage.setItem('social-media.token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(userData);

      navigate('/');
    } catch (err: any) {
      console.log(err.response.data);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('authentication-app.token');
    api.defaults.headers.common.Authorization = '';
    setUser(null);
    navigate('/login');
  }, []);

  const contextValue = useMemo(
    () => ({
      signUp,
      signIn,
      signOut,
      user,
      isAuthenticated,
      isLoading,
    } as IAuthContext),
    [user, isAuthenticated, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
