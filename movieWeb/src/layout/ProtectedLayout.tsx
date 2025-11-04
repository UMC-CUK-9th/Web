import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const ProtectedLayout = () => {
  const { storedValue: accessToken } = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEY.accessToken,
    null
  );

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
