import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = userAuth();

  // TANT QUE loading est TRUE, on ne fait rien
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // MAINTENANT que loading est false, on peut vérifier si l'user existe
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};