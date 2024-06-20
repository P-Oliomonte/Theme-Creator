import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  const [inputColor, setInputColor] = useState(defaultValue);

  function handleColorChange(event) {
    const inputColorValue = event.target.value;
    setInputColor(inputColorValue);
  }

  return (
    <div className="color-input-container">
      <input
        className="color-input"
        type="text"
        name={id}
        id={id}
        value={inputColor}
        onChange={handleColorChange}
      />

      <input
        type="color"
        id={id}
        value={inputColor}
        onChange={handleColorChange}
        className="color-picker"
      />
    </div>
  );
}
