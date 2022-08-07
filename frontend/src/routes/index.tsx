import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { GuestRoute } from './GuestRoute';
import { PrivateRoute } from './PrivateRoute';

const guestRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

const privateRoutes = [
  {
    path: '/',
    element: <Home />,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      {guestRoutes.map((route) => (
        <Route
          key={Math.random()}
          path={route.path}
          element={(
            <GuestRoute>
              {route.element}
            </GuestRoute>
          )}
        />
      ))}

      {privateRoutes.map((route) => (
        <Route
          key={Math.random()}
          path={route.path}
          element={(
            <PrivateRoute>
              {route.element}
            </PrivateRoute>
          )}
        />
      ))}
    </Routes>
  );
}