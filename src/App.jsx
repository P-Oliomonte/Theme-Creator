import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  console.log(colors);

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
    setColors([newColor, ...colors]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onColorSubmit={handleSubmit} />
      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
