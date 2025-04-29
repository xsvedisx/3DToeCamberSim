import React from "react";
import Slider from "./Slider";

export default function WheelControls({
  title,
  toe,
  setToe,
  camber,
  setCamber,
  targetToe,
  targetCamber,
}) {
  return (
    <div className="controls">
      <h3>{title}</h3>
      <Slider
        label="Toe"
        value={toe}
        setValue={setToe}
        min={-10}
        max={10}
        step={0.1}
        target={targetToe}
      />
      <Slider
        label="Camber"
        value={camber}
        setValue={setCamber}
        min={-10}
        max={10}
        step={0.1}
        target={targetCamber}
      />
    </div>
  );
}
