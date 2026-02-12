import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAll } from "../services/apiService";
import { Viewexpense } from "./Viewexpense";

export default function ExpenseList() {
  const [depenses, setDepenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchDepenses = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetchAll("depense/index");

      if (response?.data?.status === 200) {
        setDepenses(response.data.ddepense || []);
       
      } else {
        setErrorMessage("Unable to load expenses.");
      }
    } catch (error) {
      setErrorMessage("Server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepenses();
  }, []);

  /* ------------------ TOTAL ------------------ */
 

  return (
    <div className="container mt-4">
      {/* HEADER */}
    

      {/* ERROR */}
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}

      {/* LIST */}
      <Viewexpense Expense={depenses} loading={loading}  refreshList={fetchDepenses}/>
    </div>
  );
}
