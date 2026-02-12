import { useState } from "react";
import { userAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const { user, login, logout, errors, loading } = userAuth();

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const onSubmits = async (e) => {
    e.preventDefault();

    // Si un user est déjà connecté
    if (user) {
      const confirmLogout = window.confirm(
        "Un utilisateur est déjà connecté. Voulez-vous vous déconnecter pour créer un nouveau compte ?"
      );
      if (!confirmLogout) return;
      await logout();
      setMessage("Déconnecté. Vous pouvez créer un nouveau compte.");
      return;
    }

    await login("/register", dataUser);
  };

  // ✅ Redirection automatique après inscription réussie
  if (!loading && user) {
    return <Navigate to="/dashboad" replace />;
  }

  // ✅ Loader correct
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-success" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div style={{ width: "100%", maxWidth: "420px" }} className="px-3">
        <div className="card shadow-lg border-0">

          <div className="card-header text-white text-center py-3 bg-success">
            <h4 className="mb-0 fw-bold">Créer un compte</h4>
          </div>

          <div className="card-body p-4">
            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <form onSubmit={onSubmits}>

              <div className="mb-3">
                <label className="form-label fw-semibold">Nom Complet</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                  onChange={handleInput}
                  value={dataUser.name}
                />
                {errors?.name && <div className="invalid-feedback">{errors.name[0]}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                  onChange={handleInput}
                  value={dataUser.email}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                  onChange={handleInput}
                  value={dataUser.password}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Confirmation</label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control"
                  onChange={handleInput}
                  value={dataUser.password_confirmation}
                />
              </div>

              <div className="d-grid gap-2 mt-4">
                <button type="submit" className="btn btn-lg btn-success">
                  Register
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
