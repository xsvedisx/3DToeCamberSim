import React from "react";

export default function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step,
  target,
}) {
  const color =
    target != null
      ? Math.abs(value - target) <= 0.1
        ? "green"
        : Math.abs(value - target) <= 0.3
        ? "orange"
        : "red"
      : "inherit";

  return (
    <div className="slider">
      <label>
        {label}: <span style={{ color }}>{value.toFixed(1)}°</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
    </div>
  );
}
