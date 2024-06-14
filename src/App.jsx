import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";

function App() {
  const [colors, setColors] = useLocalStorageState("themeColors", {
    defaultValue: initialColors,
  });

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

  function handleUpdateColor(updatedColor, id) {
    console.log("Updated color: ", updatedColor, "ID: ", id);
    setColors(
      colors.map((color) => {
        return color.id === id
          ? {
              ...color,
              role: updatedColor.role,
              hex: updatedColor.hex,
              contrastText: updatedColor.contrastText,
            }
          : color;
      })
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm content={"ADD COLOR"} onAddColor={handleAddColor} />

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              onDelete={handleDeleteColor}
              onUpdateColor={handleUpdateColor}
            />
          );
        })
      ) : (
        <p className="paragraph_no-colors">No colors... start adding colors.</p>
      )}
    </>
  );
}

export default App;
