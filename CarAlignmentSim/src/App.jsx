import React, { useState, useEffect } from "react";
import CarSelector from "./components/CarSelector";
import CarFormModal from "./components/CarFormModal";
import CarDeleteModal from "./components/CarDeleteModal";
import { useMeasurements } from "./hooks/useMeasurements";
import WheelControls from "./components/WheelControls";
import ViewButtons from "./components/ViewButtons";
import SimulatorCanvas from "./components/SimulatorCanvas";
import { API_BASE_URL } from "./api";

export default function App() {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [measurement, fetchMeasurements] = useMeasurements(selectedCarId);
  const [carInfo, setCarInfo] = useState(null);
  const [targetToe, setTargetToe] = useState(0);
  const [targetCamber, setTargetCamber] = useState(0);
  const [leftToe, setLeftToe] = useState(0);
  const [leftCamber, setLeftCamber] = useState(0);
  const [rightToe, setRightToe] = useState(0);
  const [rightCamber, setRightCamber] = useState(0);
  const [activeView, setActiveView] = useState("top");

  // load cars once
  useEffect(() => {
    fetch(`${API_BASE_URL}/cars`)
      .then((res) => res.json())
      .then(setCars)
      .catch(console.error);
  }, []);

  // seed measurement state when fetched
  useEffect(() => {
    if (!measurement) return;
    setCarInfo({
      brand: measurement.brand,
      model: measurement.model,
      year: measurement.year,
    });
    setTargetToe(measurement.optimalToe);
    setTargetCamber(measurement.optimalCamber);
    setLeftToe(measurement.leftToe);
    setLeftCamber(measurement.leftCamber);
    setRightToe(measurement.rightToe);
    setRightCamber(measurement.rightCamber);
  }, [measurement]);

  // add a new car to local list
  const handleAddCar = (newCar) => {
    setCars((prev) => [...prev, newCar]);
  };

  // remove deleted car from local list & clear selection
  const handleDeleteCar = (deletedId) => {
    setCars((prev) => prev.filter((c) => c.id !== deletedId));
    if (selectedCarId === deletedId) {
      setSelectedCarId(null);
      setCarInfo(null);
    }
  };

  return (
    <div className="layout">
      <h1>Toe & Camber 3D Sim</h1>

      <div className="top-bar">
        <CarSelector cars={cars} onSelect={setSelectedCarId} />

        <div className="top-bar-actions">
          <CarFormModal onAdd={handleAddCar} />
          <CarDeleteModal carId={selectedCarId} onDelete={handleDeleteCar} />
          <button
            onClick={fetchMeasurements}
            disabled={!selectedCarId}
            style={{ cursor: selectedCarId ? "pointer" : "not-allowed" }}
          >
            Get Measurements
          </button>
        </div>
      </div>

      {carInfo && (
        <div className="selected-car-info" style={{ margin: "1rem 0" }}>
          <h2>
            {carInfo.brand} {carInfo.model} ({carInfo.year})
          </h2>
          <p>
            <strong>Optimal Toe:</strong> {targetToe.toFixed(1)}°{" "}
            <strong>Optimal Camber:</strong> {targetCamber.toFixed(1)}°
          </p>
        </div>
      )}

      <div className="panel">
        <WheelControls
          title="Left Wheel"
          toe={leftToe}
          setToe={setLeftToe}
          camber={leftCamber}
          setCamber={setLeftCamber}
          targetToe={targetToe}
          targetCamber={targetCamber}
        />

        <div className="canvas-column">
          <h3>3D Camera View:</h3>
          <ViewButtons active={activeView} onChange={setActiveView} />
          <SimulatorCanvas
            leftToe={leftToe}
            leftCamber={leftCamber}
            rightToe={rightToe}
            rightCamber={rightCamber}
            activeView={activeView}
          />
        </div>

        <WheelControls
          title="Right Wheel"
          toe={rightToe}
          setToe={setRightToe}
          camber={rightCamber}
          setCamber={setRightCamber}
          targetToe={targetToe}
          targetCamber={targetCamber}
        />
      </div>
    </div>
  );
}
