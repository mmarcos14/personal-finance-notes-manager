// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaStickyNote, FaMoneyBillWave, FaUserCircle } from "react-icons/fa";

export const Home = () => {
  return (
    <div className="container-fluid min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center py-5">
      
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to My Portfolio Project</h1>
        <p className="lead text-muted">
          Explore my project features and see how I code professionally
        </p>
      </header>

      {/* Cards Section */}
      <div className="row g-4 justify-content-center w-100">
        
        {/* Notes Card */}
        <div className="col-md-3">
          <Link to="/note" className="text-decoration-none">
            <div className="card shadow-sm h-100 text-center hover-scale">
              <div className="card-body">
                <FaStickyNote size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">Notes</h5>
                <p className="text-muted">
                  Create, edit, and manage your notes seamlessly.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Dépenses Card */}
        <div className="col-md-3">
          <Link to="/depense" className="text-decoration-none">
            <div className="card shadow-sm h-100 text-center hover-scale">
              <div className="card-body">
                <FaMoneyBillWave size={40} className="text-success mb-3" />
                <h5 className="fw-bold">Depenses</h5>
                <p className="text-muted">
                  Track your expenses and transfers efficiently.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Profil Card */}
        <div className="col-md-3">
          <Link to="/dashboard" className="text-decoration-none">
            <div className="card shadow-sm h-100 text-center hover-scale">
              <div className="card-body">
                <FaUserCircle size={40} className="text-warning mb-3" />
                <h5 className="fw-bold">Profile</h5>
                <p className="text-muted">
                  Check your profile info and account status.
                </p>
              </div>
            </div>
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-5 text-center text-muted">
        &copy; {new Date().getFullYear()} Ambroise Zounmenou Portfolio Project
      </footer>

      {/* Hover scale effect */}
      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};
