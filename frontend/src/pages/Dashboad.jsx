import { useState, useEffect } from "react";
import { userAuth } from "../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchNotes } from "../services/NoteServices";
import { fetchDepenses } from "../services/DepenseServices";
import { updateOne } from "../services/apiService";
import { Link } from "react-router-dom";

/* =======================
   Reusable Card Component
======================= */
const StatCard = ({ title, value, icon, loading }) => (
  <div className="card shadow-sm border-0 h-100 hover-card">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="text-muted fw-semibold mb-1">{title}</h6>
        <span className="fs-4">{icon}</span>
      </div>
      {loading ? (
        <Skeleton width={60} />
      ) : (
        <h3 className="fw-bold mb-0">{value}</h3>
      )}
    </div>
  </div>
);

export const Dashboard = () => {
  const { user,getUser } = userAuth();

  const [notesCount, setNotesCount] = useState(0);
  const [depenseCount, setDepenseCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  /* =======================
     Load user into form
  ======================= */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  /* =======================
     Fetch dashboard stats
  ======================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const notesResp = await fetchNotes();
        const depenseResp = await fetchDepenses();

        setNotesCount(notesResp.data.notess.length);
        setDepenseCount(depenseResp.data.ddepense.length);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    try {
      const res = await updateOne("userProfil", formData);
      setMessage(res.data.message);
      getUser();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">

        {/* ===== Header ===== */}
        <div className="mb-4">
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome back, <strong>{user?.name} <span className={`mx-3 float-end ${user.status =="-1" ? 'bg-danger text-white':'bg-success text-white'}`}>Status:{user.status=="-1" ? "Inactif" : "Active"}</span></strong> 
          </p>
        </div>

        {/* ===== Stats ===== */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
          <Link className="text-decoration-none" to={'/note'}>
            <StatCard
              title="Total Notes"
              value={notesCount}
              icon="📝"
              loading={loadingStats}
            /></Link>
          </div>
          <div className="col-md-4">
          <Link className="text-decoration-none" to={'/depense'}>
            <StatCard
              title="Total Expenses"
              value={depenseCount}
              icon="💸"
              loading={loadingStats}
            />
          </Link>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 hover-card">
              <div className="card-body">
                <h6 className="text-muted fw-semibold mb-3">Quick Actions</h6>
                <Link to="/note" className="btn btn-primary btn-sm me-2">
                  + Note
                </Link>
                <Link to="/depense" className="btn btn-warning btn-sm">
                  + Expense
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Profile Update ===== */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3">Update Profile</h5>

            {message && (
              <div className="alert alert-success">{message}</div>
            )}

            <form onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleInput}
                  />
                  {errors?.name && (
                    <div className="invalid-feedback">
                      {errors.name[0]}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleInput}
                  />
                  {errors?.email && (
                    <div className="invalid-feedback">
                      {errors.email[0]}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                    value={formData.password}
                    onChange={handleInput}
                    placeholder="Leave empty to keep current password"
                  />
                  {errors?.password && (
                    <div className="invalid-feedback">
                      {errors.password[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* ===== Hover Effect ===== */}
      <style>{`
        .hover-card {
          transition: all 0.25s ease;
        }
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
};
