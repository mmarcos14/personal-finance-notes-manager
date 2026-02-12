import { useEffect, useState } from "react";
import { TableDataNote } from "./TableDataNote";
import { fetchAll } from "../services/apiService";

export default function ListNote() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetchAll("notes/index");
      setNotes(response.data.notess || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container my-4">
      <TableDataNote notes={notes} refreshList={fetchNotes} loading={loading} />
    </div>
  );
}
