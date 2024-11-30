import React from "react";
import "../css/generate.css";

interface ToggleSwitchProps {
  isOn: boolean;
  label: string;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  label,
  onToggle,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Toggle Button */}
      <div
        className="toggle-bg"
        onClick={onToggle}
        style={{
          backgroundColor: isOn ? "var(--main-color)" : "#ccc",
        }}
      >
        <div
          className="toggle-trigger"
          style={{
            transform: isOn ? "translateX(25px)" : "translateX(0px)",
          }}
        ></div>
      </div>
      <span style={{ fontSize: "16px", color: "#555" }}>{label}</span>
    </div>
  );
};

export default ToggleSwitch;
