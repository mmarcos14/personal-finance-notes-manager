import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { createOne, updateOne } from "../services/apiService";
import toast from "react-hot-toast";

export const ModalNote = ({ isOpen, hideModal, currentNote, refreshList }) => {
  const [dataNote, setDataNote] = useState({
    title: "",
    body: "",
    id: "",
    date_note:new Date().toISOString().slice(0,10)
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentNote?.id) {
      setDataNote(currentNote);
    } else {
      setDataNote({ title: "", body: "", id: "" });
    }
  }, [currentNote]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (currentNote?.id) {
        await updateOne("notes", dataNote);
         toast.success("Note updated successfully");
      } else {
        await createOne("notes", dataNote);
       toast.success("Note created successfully");
      }

      setDataNote({ title: "", body: "", id: "" });
      hideModal();
      refreshList?.();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const buttonText = loading
    ? currentNote?.id
      ? "Updating..."
      : "Saving..."
      : currentNote?.id
      ? "Update"
      : "Save";

  return (
<Modal
  show={isOpen}
  onHide={hideModal}
  centered
  backdrop={loading ? "static" : true}
  keyboard={!loading}
>
  {/* HEADER */}
  <Modal.Header closeButton={!loading}>
    <Modal.Title className="fw-semibold">
      {currentNote?.id ? "✏️ Edit Note" : "📝 Create Note"}
    </Modal.Title>
  </Modal.Header>

  {/* BODY */}
  <Modal.Body>
    <form onSubmit={handleSubmit}>

      {/* TITLE */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Ex: Meeting notes"
          value={dataNote.title}
          onChange={handleInput}
          required
          disabled={loading}
        />
      </div>

      {/* CONTENT */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Content
        </label>
        <textarea
          name="body"
          className="form-control"
          rows="5"
          placeholder="Write your note here..."
          value={dataNote.body}
          onChange={handleInput}
          required
          disabled={loading}
        />
      </div>

         {/* Date */}
                <input
                  type="date"
                  className="form-control mb-4"
                  name="date_note"
                  value={dataNote.date_note}
                   onChange={handleInput}
                />

      {/* ACTION BUTTON */}
      <Button
        type="submit"
        className="w-100 d-flex align-items-center justify-content-center gap-2"
        disabled={loading}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {buttonText}
      </Button>
    </form>
  </Modal.Body>

  {/* FOOTER */}
  <Modal.Footer className="justify-content-between">
    <small className="text-muted">
      {currentNote?.id ? "Editing existing note" : "New note will be saved"}
    </small>

    <Button
      variant="outline-secondary"
      size="sm"
      onClick={hideModal}
      disabled={loading}
    >
      Cancel
    </Button>
  </Modal.Footer>
</Modal>

  );
};
