import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  console.log(colors);

  function handleAddColor(data) {
    const newColor = {
      id: uid(6),
      role: data.role,
      hex: data.hex,
      contrastText: data.contrastText,
    };
    setColors([newColor, ...colors]);
  }

  function handleDeleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm content={"ADD COLOR"} onAddColor={handleAddColor} />

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color key={color.id} color={color} onDelete={handleDeleteColor} />
          );
        })
      ) : (
        <p className="paragraph_no-colors">No colors... start adding colors.</p>
      )}
    </>
  );
}

export default App;
