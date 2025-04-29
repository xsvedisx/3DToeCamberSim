import { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";

export default function CarSelector({ onSelect }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cars`, { mode: "cors" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading cars…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <select onChange={(e) => onSelect(+e.target.value)} defaultValue="">
      <option value="" disabled>
        - Select a car -
      </option>
      {cars.map((c) => (
        <option key={c.id} value={c.id}>
          {c.brand} {c.model} ({c.year})
        </option>
      ))}
    </select>
  );
}
