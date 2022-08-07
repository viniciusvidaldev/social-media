import { ReactNode } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

interface CustomRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: CustomRouteProps) {
  // const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      {children}
    </>
  );
}