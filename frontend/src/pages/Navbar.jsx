import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout, loading } = userAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span className="bg-primary rounded-circle d-inline-flex 
            justify-content-center align-items-center me-2"
            style={{ width: 35, height: 35 }}
          >
            <i className="bi bi-lightning-fill text-white"></i>
          </span>
          MonApp
        </Link>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>

              <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>

            {!loading && !user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Connexion</Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm px-3" to="/register">
                    S’inscrire
                  </Link>
                </li>
              </>
            ) : (
              user && (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    👋 {user.name.length > 12
                      ? user.name.slice(0, 12) + "…"
                      : user.name}
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                      <Link className="dropdown-item" to="/dashboad">
                        <i className="bi bi-person me-2"></i> Profil
                      </Link>
                    </li>

                    <li><hr className="dropdown-divider" /></li>
                     {user.status=="3" && (
                         <li>
                      <Link
                        to={'/list_user'}
                        className="dropdown-item text-primary fw-bold"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                         User List
                      </Link>

                           <Link
                        to={'/listc'}
                        className="dropdown-item text-primary fw-bold"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                       Mesage user
                      </Link>
                    </li>
                     )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </li>
              )
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};
