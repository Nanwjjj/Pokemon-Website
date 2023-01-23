import { useSearchParams, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Check URL params for password

  // Mengecek apakah user memiliki akses ke path

  const [authCheck] = useSearchParams();

  if (authCheck.get("password") === "secret") {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default ProtectedRoute;
