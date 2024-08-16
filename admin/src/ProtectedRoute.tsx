// ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: ReactNode;        // The component to render if access is allowed
  allowedRoles: string[];    // Array of roles allowed to access this route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
  const role = localStorage.getItem('role');

  // Check if the user's role is allowed
  if (!role || !allowedRoles.includes(role)) {
    // Redirect to the login page if not authorized
    return <Navigate to="/login" />;
  }

  // Render the protected component
  return <>{element}</>;
};

export default ProtectedRoute;
