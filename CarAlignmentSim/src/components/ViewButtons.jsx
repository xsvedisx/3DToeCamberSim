import React from "react";

export default function ViewButtons({ active, onChange }) {
  const views = ["top", "front", "rear"];
  return (
    <div className="view-buttons">
      {views.map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          style={{
            background: active === v ? "black" : "#0059ff",
            color: "#fff",
          }}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}
