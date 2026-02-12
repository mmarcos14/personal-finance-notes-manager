import axios from "axios";
import { useState } from "react";

export const FilterDepense = () => {
  // State du formulaire
  const [dataFilter, setDataFilter] = useState({
    date1: "",
    date2: "",
    motif: "",
    type: "",
  });

  // State des résultats
  const [depenses, setDepenses] = useState([]);

  // Gestion des inputs
  const handleInput = (e) => {
    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire
  const submitSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/depense/filter",
        dataFilter,
        { withCredentials: true, withXSRFToken: true }
      );

      setDepenses(response.data.depenses);
    } catch (error) {
      console.error("Erreur lors du filtre :", error);
      alert("Une erreur est survenue. Vérifiez la console.");
    }
  };

    const categories = [
    "Food",
    "Transport",
    "Bet",
    "Game",
    "Saving",
    "Other",
  ];

  const paymentMethods = ["Cash", "Card", "Mobile", "Bank"];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          {/* CARD FILTRE */}
          <div className="card">
            <div className="card-header bg-warning text-white">
              Filtrer les Dépenses
            </div>

            <div className="card-body">
              <form onSubmit={submitSave}>

                {/* Dates */}
                <div className="d-flex mb-3">
                  <input
                    type="date"
                    name="date1"
                    value={dataFilter.date1}
                    onChange={handleInput}
                    className="form-control mx-2"
                  />
                  <input
                    type="date"
                    name="date2"
                    value={dataFilter.date2}
                    onChange={handleInput}
                    className="form-control mx-2"
                  />
                </div>

                {/* Selects */}
                <div className="d-flex mb-3">
                  <select
                    className="form-select mx-2"
                    name="motif"
                    value={dataFilter.motif}
                    onChange={handleInput}
                  >
                    <option value="">Select motif</option>
                    <option value="Food">Food</option>
                    <option value="Saving">Saving</option>
                    <option value="Bet">Bet</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    className="form-select mx-2"
                    name="type"
                    value={dataFilter.type}
                    onChange={handleInput}
                  >
                    <option value="">Select type</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                  </select>
                </div>

                {/* Bouton */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Rechercher
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* RÉSULTATS */}
          <div className="mt-4">
            {depenses.length === 0 ? (
              <p className="text-center text-muted">Aucun résultat</p>
            ) : (
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Motif</th>
                    <th>Type</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {depenses.map((depense, index) => (
                    <tr key={index}>
                      <td>{depense.motif}</td>
                      <td>{dataFilter.transactionType || "Tous"}</td>
                      <td>{depense.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
