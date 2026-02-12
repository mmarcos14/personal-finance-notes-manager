import { useState } from "react";
import { userAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export const Login = () => {
  const { user, login, errors, loading } = userAuth();

  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const [btnLoading, setBtnLoading] = useState(false);

  const handleInput = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const onSubmits = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await login("/login", dataUser);
    setBtnLoading(false);
  };

  // ✅ REDIRECTION AUTOMATIQUE
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Loader auth
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white text-center">
            <h4 className="mb-0">Connexion</h4>
          </div>

          <div className="card-body p-4">
            <form onSubmit={onSubmits}>
              {/* Email */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                  value={dataUser.email}
                  onChange={handleInput}
                />
                {errors?.email && (
                  <div className="invalid-feedback">
                    {errors.email[0]}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                  value={dataUser.password}
                  onChange={handleInput}
                />
                {errors?.password && (
                  <div className="invalid-feedback">
                    {errors.password[0]}
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={btnLoading}
              >
                {btnLoading ? "Connexion..." : "Se connecter"}
              </button>

              <Link
                to="/register"
                className="d-block text-center mt-3"
              >
                Pas de compte ? Créez-en un
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
