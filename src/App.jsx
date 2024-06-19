import { initialColors, initialThemes } from "./lib/colors";
import Theme from "./Components/Theme/Theme";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";

function App() {
  const [colors, setColors] = useLocalStorageState("themeColors", {
    defaultValue: initialColors,
  });

  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", {
    defaultValue: initialThemes[0],
  });

  function handleThemeChange(event) {
    const themeName = event.target.value;
    const filteredTheme = themes.filter((theme) => theme.name === themeName);
    setCurrentTheme(filteredTheme[0]);
  }

  console.log("currentTheme: ", currentTheme);
  console.log("currentThemeColors: ", currentTheme.colors);

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
      <Select themes={themes} onHandleThemeChange={handleThemeChange} />
      <Theme
        colors={currentTheme.colors}
        onAddColor={handleAddColor}
        onDeleteColor={handleDeleteColor}
        onUpdateColor={handleUpdateColor}
      />
    </>
  );
}

export default App;

///////

function Select({ themes, onHandleThemeChange }) {
  return (
    <form onChange={onHandleThemeChange}>
      <select name="theme-select">
        {themes.map((theme) => {
          return <option key={theme.id}>{theme.name}</option>;
        })}
      </select>
    </form>
  );
}
