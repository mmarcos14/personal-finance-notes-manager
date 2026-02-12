import { useState, useEffect } from "react";
import { deleteOne } from "../services/apiService";
import { ModalNote } from "./ModalNote";
import toast from "react-hot-toast";

export const TableDataNote = ({ notes = [], refreshList, loading }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNote, setModalNote] = useState(null);
  const notesPerPage = 5;

  useEffect(() => setCurrentPage(1), [search]);

  const filteredNotes = notes.filter(
    (n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * notesPerPage;
  const firstIndex = lastIndex - notesPerPage;
  const records = filteredNotes.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      try {
      const response=  await deleteOne("notes/delete", id);
       const {status,message}=response.data
       if(status===200){
        toast.success(message)
         refreshList && refreshList();
       }else if(status===502){
         toast.success(message)
       }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
   <div className="container mt-4">
  <div className="row justify-content-center border-primary">
    <div className="col-12 col-md-8 col-lg-6  rounded-4">

      {/* HEADER */}
      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-stretch align-items-sm-center mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-info btn-sm"
          onClick={() => {
            setModalNote(null);
            setModalOpen(true);
          }}
        >
          + Add Note
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {records.length ? (
            records.map((note) => (
              <div
                key={note.id}
                className="card border-start border-dark shadow-sm"
              >
                <div className="card-body">
                  <h6 className="fw-semibold">
                    {openNoteId === note.id
                      ? note.title
                      : note.title.slice(0, 30) + "..."}
                  </h6>

                  <p className="mb-2">
                    {openNoteId === note.id
                      ? note.body
                      : note.body.slice(0, 130) + "..."}
                  </p>

                  <button
                    className="btn btn-link btn-sm p-0"
                    onClick={() =>
                      setOpenNoteId(
                        openNoteId === note.id ? null : note.id
                      )
                    }
                  >
                    {openNoteId === note.id ? "Lire moins" : "Lire plus"}
                  </button>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {note.date_note}
                  </small>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        setModalNote(note);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                <hr/>

                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No notes found</p>
          )}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <ModalNote
          isOpen={modalOpen}
          hideModal={() => setModalOpen(false)}
          currentNote={modalNote}
          refreshList={refreshList}
        />
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
            </li>

            {pages.map((p) => (
              <li
                key={p}
                className={`page-item ${currentPage === p ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

    </div>
  </div>
</div>

  );
};
