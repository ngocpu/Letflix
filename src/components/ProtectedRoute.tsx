import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user?.email);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
export default ProtectedRoute
