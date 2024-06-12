import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({ onColorSubmit }) {
  const initialData = {
    role: "Color name",
    hex: "#000000",
    contrastText: "#ffffff",
  };

  return (
    <form className="input-form" onSubmit={onColorSubmit}>
      <label htmlFor="crole" className="input-label">
        Role
      </label>
      <input
        name="role"
        id="role"
        type="text"
        defaultValue={initialData.role}
      />

      <label htmlFor="hex" className="input-label">
        Hex
      </label>

      <ColorInput id="hex" defaultValue={initialData.hex} />

      <label htmlFor="contrastText" className="input-label">
        Contrast Text
      </label>

      <ColorInput id="contrastText" defaultValue={initialData.contrastText} />

      <button type="submit" className="submit-button">
        ADD COLOR
      </button>
    </form>
  );
}
