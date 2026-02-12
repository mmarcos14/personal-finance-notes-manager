import React, { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modalexpense } from "./Modalexpense";
import { deleteOne } from "../services/apiService";

export const Viewexpense = ({ Expense = [], loading = false ,refreshList}) => {
  const [search, setSearch] = useState("");
  const [show,setShow]=useState(false);
   const [editModal,setModal]=useState(false);
   const [individualDepense,setIndividualDepense]=useState(null);


  const searchValue = search.toLowerCase();

  /* ------------------ FILTER ------------------ */
  const deposits = Expense.filter((i) => Number(i.amount) > 0);
  const withdraws = Expense.filter((i) => Number(i.amount) < 0);

  const filteredDeposits = deposits.filter(
    (item) =>
      item.recipient.toLowerCase().includes(searchValue) ||
      String(item.amount).includes(searchValue)
  );

  const filteredWithdraws = withdraws.filter(
    (item) =>
      item.recipient.toLowerCase().includes(searchValue) ||
      String(item.amount).includes(searchValue)
  );

  /* ------------------ PAGINATION ------------------ */
  const perPage = 5;

  const paginate = (data, page) => {
    const start = (page - 1) * perPage;
    return data.slice(start, start + perPage);
  };

  const [pageDeposit, setPageDeposit] = useState(1);
  const [pageWithdraw, setPageWithdraw] = useState(1);

  const depositPages = Math.ceil(filteredDeposits.length / perPage);
  const withdrawPages = Math.ceil(filteredWithdraws.length / perPage);

  /* ------------------ TOTALS ------------------ */
  const totalDeposit = useMemo(
    () => deposits.reduce((t, n) => t + Number(n.amount), 0),
    [deposits]
  );

  const totalWithdraw = useMemo(
    () => withdraws.reduce((t, n) => t + Math.abs(Number(n.amount)), 0),
    [withdraws]
  );

   const totalAmount = useMemo(() => {
    return Expense.reduce((total, n) => total + Number(n.amount), 0);
  }, [Expense]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }
  

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this expense?")) return;

  try {
    await deleteOne("depense/delete", id);
    refreshList && refreshList();
  } catch (error) {
    console.error(error);
    alert("Failed to delete expense");
  }
};


  return (
    <div className="container mt-5">
      {/* SEARCH */}
      <div className="row mb-4">
         <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <input
            className="form-control shadow-sm w-25"
            placeholder="Search by name or amount..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageDeposit(1);
              setPageWithdraw(1);
            }}
          />
           <div>
          <span className="badge bg-dark">
            Total Balance: ${totalAmount.toFixed(2)}
          </span>
        </div>
              <Link to="/depense" onClick={()=>setShow(true)} className="btn btn-primary btn-sm">
          + Add Expense
        </Link>
        </div>
      </div>

      <div className="row g-4">
        {/* ------------------ DEPOSITS ------------------ */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-success text-white fw-bold d-flex justify-content-between" style={{backgroundColor:"rgba(255, 99, 71, 0.5)"}}>
              <span>Deposits</span>
              <span className="badge bg-light text-success">
                ${totalDeposit.toFixed(2)}
              </span>
            </div>

            <div className="card-body p-0">
             <div className="table-responsive">
               <table className="table table-striped table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Destination</th>
                    <th className="text-end">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(filteredDeposits, pageDeposit).length > 0 ? (
                    paginate(filteredDeposits, pageDeposit).map((item) => (
                      <tr key={item.id}>
                        <td>{item.created_at?.slice(0, 10)}</td>
                        <td>{item.recipient}</td>
                        <td className="text-end text-success fw-semibold">
                          +{Number(item.amount).toFixed(2)}
                        </td>
                           <td className="d-flex">
                           <Button variant="success" size="sm" className="mx-2" onClick={()=>{setModal(true);setIndividualDepense(item)}}>
                          Edit
                        </Button>

                        <Button variant="danger" size="sm" className="mx-2" onClick={()=>handleDelete(item.id)}>
                          Delete
                        </Button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No deposits found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
             </div>
            </div>

            {/* Pagination */}
            {depositPages > 1 && (
              <div className="card-footer text-center">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  disabled={pageDeposit === 1}
                  onClick={() => setPageDeposit(pageDeposit - 1)}
                >
                  Prev
                </button>
                <span className="fw-semibold">
                  {pageDeposit} / {depositPages}
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  disabled={pageDeposit === depositPages}
                  onClick={() => setPageDeposit(pageDeposit + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ------------------ WITHDRAWS ------------------ */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-danger text-white fw-bold d-flex justify-content-between">
              <span>Withdraws</span>
              <span className="badge bg-light text-danger">
                ${totalWithdraw.toFixed(2)}
              </span>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                 <table className="table table-striped table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Destination</th>
                    <th className="text-end">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(filteredWithdraws, pageWithdraw).length > 0 ? (
                    paginate(filteredWithdraws, pageWithdraw).map((item) => (
                      <tr key={item.id}>
                        <td>{item.created_at?.slice(0, 10)}</td>
                        <td>{item.recipient}</td>
                        <td className="text-end text-danger fw-semibold">
                          -{Math.abs(item.amount).toFixed(2)}
                        </td>
                        <td>
                         <div className="d-flex">
                        <Button variant="success" size="sm" className="mx-2" onClick={()=>{setModal(true);setIndividualDepense(item)}}>

                          Edit
                        </Button>

                       <Button variant="danger" size="sm" className="mx-2" onClick={()=>handleDelete(item.id)}>
                          Delete
                        </Button>
                         </div>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No withdraws found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>

            {/* Pagination */}
            {withdrawPages > 1 && (
              <div className="card-footer text-center">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  disabled={pageWithdraw === 1}
                  onClick={() => setPageWithdraw(pageWithdraw - 1)}
                >
                  Prev
                </button>
                <span className="fw-semibold">
                  {pageWithdraw} / {withdrawPages}
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  disabled={pageWithdraw === withdrawPages}
                  onClick={() => setPageWithdraw(pageWithdraw + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
               {show && (<Modalexpense isOpen={show} HideModal={()=>setShow(false)} ListeExpense={refreshList}/>)}
               {editModal && (<Modalexpense isOpen={editModal} HideModal={()=>setModal(false)} ListeExpense={refreshList} Currentexpense={individualDepense}/>)}



      </div>
    </div>
  );
};
