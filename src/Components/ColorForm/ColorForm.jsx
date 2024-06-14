import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  onAddColor,
  color,
  content,
  onUpdateClick,
}) {
  const initialData = {
    role: "Color name",
    hex: "#000000",
    contrastText: "#ffffff",
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddColor(data);
    content === "UPDATE COLOR" && onUpdateClick();
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <label htmlFor="crole" className="input-label">
        Role
      </label>
      <input
        name="role"
        id="role"
        type="text"
        defaultValue={color ? color.role : initialData.role}
      />

      <label htmlFor="hex" className="input-label">
        Hex
      </label>

      <ColorInput id="hex" defaultValue={color ? color.hex : initialData.hex} />

      <label htmlFor="contrastText" className="input-label">
        Contrast Text
      </label>

      <ColorInput
        id="contrastText"
        defaultValue={color ? color.contrastText : initialData.contrastText}
      />

      <button type="submit" className="submit-button">
        {content}
      </button>
    </form>
  );
}
