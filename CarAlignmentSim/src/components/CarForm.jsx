import React, { useState } from "react";
import { API_BASE_URL } from "../api";

export default function CarForm({ onAdd }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [optimalToe, setOptimalToe] = useState(0);
  const [optimalCamber, setOptimalCamber] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, model, year, optimalToe, optimalCamber }),
    })
      .then((res) => res.json())
      .then((newCar) => {
        onAdd(newCar);
        setBrand("");
        setModel("");
        setYear(new Date().getFullYear());
        setOptimalToe(0);
        setOptimalCamber(0);
      })
      .catch(console.error);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="car-form"
      style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
    >
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        required
      />
      <input
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Model"
        required
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(+e.target.value)}
        style={{ width: "4rem" }}
      />
      Toe
      <input
        type="number"
        step="0.1"
        value={optimalToe}
        onChange={(e) => setOptimalToe(+e.target.value)}
        placeholder="Opt. Toe"
        style={{ width: "5rem" }}
      />
      Camber
      <input
        type="number"
        step="0.1"
        value={optimalCamber}
        onChange={(e) => setOptimalCamber(+e.target.value)}
        placeholder="Opt. Camber"
        style={{ width: "5rem" }}
      />
      <button type="submit">Add Car</button>
    </form>
  );
}
