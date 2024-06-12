import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";

export default function ColorForm() {
  const initialData = {
    role: "Color name",
    hex: "#000000",
    contrastText: "#ffffff",
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newColor = {
      id: uid(6),
      role: data.role,
      hex: data.hex,
      contrastText: data.contrastText,
    };
    console.log(newColor);
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">ADD COLOR</button>
    </form>
  );
}
