import React, { useState } from "react";
import { createOne } from "../services/apiService";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrors({});

    try {
      const response = await createOne("contact", formData);

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          name: "",
          firstname: "",
          email: "",
          description: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Server error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              Contact Recruiter
            </div>

            <div className="card-body">
              {success && (
                <div className="alert alert-success">
                  Message sent successfully ✅
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="mb-3">
                  <input
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name[0]}
                    </div>
                  )}
                </div>

                {/* FIRSTNAME */}
                <div className="mb-3">
                  <input
                    className={`form-control ${
                      errors.firstname ? "is-invalid" : ""
                    }`}
                    name="firstname"
                    placeholder="Your firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">
                      {errors.firstname[0]}
                    </div>
                  )}
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email[0]}
                    </div>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="mb-3">
                  <textarea
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    name="description"
                    rows="4"
                    placeholder="Message"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
