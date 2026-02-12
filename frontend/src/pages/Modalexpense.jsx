import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOne, updateOne } from "../services/apiService";
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import toast from "react-hot-toast";

export const Modalexpense = ({
  isOpen,
  HideModal,
  Currentexpense,
  ListeExpense,
}) => {
  const navigate = useNavigate();

  const categories = ["Food", "Transport", "Bet", "Game", "Saving", "Other"];
  const paymentMethods = ["Cash", "Card", "Mobile", "Bank"];

  const initialForm = {
    id: "",
    category: "",
    recipient: "",
    transactionType: "",
    paymentMethod: "",
    amount: "",
    isGambling: false,
    description: "",
    date_transfert: new Date().toISOString().slice(0, 10),
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -------------------- HANDLE CHANGE -------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage(null);
    setLoading(true);

    try {
      if (Number(form.id)) {
        await updateOne("depense", form);
        toast.success("Updated successfully");
      } else {
        await createOne("depense", form);
        toast.success("Created successfully");
      }

      if (ListeExpense) ListeExpense();
      HideModal();
      navigate("/depense");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrorMessage("Erreur serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- LOAD EXPENSE (EDIT MODE) -------------------- */
  useEffect(() => {
    if (Currentexpense) {
      setForm({
        id: Currentexpense.id,
        category: Currentexpense.category || "",
        recipient: Currentexpense.recipient || "",
        transactionType: Currentexpense.transactionType || "",
        paymentMethod: Currentexpense.paymentMethod || "",
        amount: Math.abs(Currentexpense.amount) || "",
        isGambling: Currentexpense.isGambling || false,
        description: Currentexpense.description || "",
        date_transfert: Currentexpense.date_transfert
          ? Currentexpense.date_transfert.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    } else {
      setForm(initialForm); // reset en mode création
    }
  }, [Currentexpense, isOpen]);

  return (
    <Modal show={isOpen} onHide={HideModal} centered>
      <ModalHeader closeButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <select
            className="form-select mb-3"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Catégorie</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Recipient */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Bénéficiaire / Plateforme"
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
          />

          {/* Transaction type */}
          <select
            className="form-select mb-3"
            name="transactionType"
            value={form.transactionType}
            onChange={handleChange}
          >
            <option value="">Type</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          {/* Payment method */}
          <select
            className="form-select mb-3"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Moyen de paiement</option>
            {paymentMethods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            step="0.01"
            className="form-control mb-3"
            placeholder="Montant ($)"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />

          {/* Gambling */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="isGambling"
              checked={form.isGambling}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Lié à un jeu / pari 🎰
            </label>
          </div>

          {/* Description */}
          <textarea
            className="form-control mb-3"
            rows="2"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          {/* Date */}
          <input
            type="date"
            className="form-control mb-4"
            name="date_transfert"
            value={form.date_transfert}
            onChange={handleChange}
          />

          <button className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};
