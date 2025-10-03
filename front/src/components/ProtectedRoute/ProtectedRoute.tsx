import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, children }) => {
  console.log(isAllowed);
  if (!isAllowed) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
