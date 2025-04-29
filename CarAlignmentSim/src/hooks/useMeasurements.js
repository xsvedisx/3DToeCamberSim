import { useState, useCallback } from "react";
import { API_BASE_URL } from "../api";

const API_URL = API_BASE_URL;

export function useMeasurements(carId) {
  const [measurement, setMeasurement] = useState(null);

  const fetchMeasurements = useCallback(() => {
    if (!carId) return;
    fetch(`${API_URL}/cars/${carId}/measurements`, { mode: "cors" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setMeasurement)
      .catch(console.error);
  }, [carId]);

  return [measurement, fetchMeasurements];
}
