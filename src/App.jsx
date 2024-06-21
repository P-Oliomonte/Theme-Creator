import { initialThemes } from "./lib/colors";
import Theme from "./Components/Theme/Theme";
import ThemeSelect from "./Components/ThemeSelect/ThemeSelect";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";

function App() {
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

  function handleAddColor(data) {
    const newColor = {
      id: uid(6),
      role: data.role,
      hex: data.hex,
      contrastText: data.contrastText,
    };

    const updatedThemes = themes.map((theme) => {
      if (theme.name === currentTheme.name) {
        return {
          ...theme,
          colors: [newColor, ...theme.colors],
        };
      }
      return theme;
    });
    setThemes(updatedThemes);

    const updatedCurrentTheme = updatedThemes.find(
      (theme) => theme.name === currentTheme.name
    );
    setCurrentTheme(updatedCurrentTheme);
  }

  function handleDeleteColor(id) {
    const updatedThemes = themes.map((theme) => {
      if (theme.name === currentTheme.name) {
        return {
          ...theme,
          colors: theme.colors.filter((color) => color.id !== id),
        };
      }
      return theme;
    });
    setThemes(updatedThemes);

    const updatedCurrentTheme = updatedThemes.find(
      (theme) => theme.name === currentTheme.name
    );
    setCurrentTheme(updatedCurrentTheme);
  }

  function handleUpdateColor(updatedColor, id) {
    const updatedThemes = themes.map((theme) => {
      if (theme.name === currentTheme.name) {
        return {
          ...theme,
          colors: theme.colors.map((color) => {
            return color.id === id
              ? {
                  ...color,
                  role: updatedColor.role,
                  hex: updatedColor.hex,
                  contrastText: updatedColor.contrastText,
                }
              : color;
          }),
        };
      }
      return theme;
    });

    setThemes(updatedThemes);

    const updatedCurrentTheme = updatedThemes.find(
      (theme) => theme.name === currentTheme.name
    );
    setCurrentTheme(updatedCurrentTheme);
  }

  function handleSubmitTheme(newThemeName) {
    const newTheme = {
      id: uid(6),
      name: newThemeName,
      colors: [],
    };
    const updatedThemes = [...themes, newTheme];

    setThemes(updatedThemes);

    const updatedCurrentTheme = updatedThemes.find(
      (theme) => theme.name === newThemeName
    );
    setCurrentTheme(updatedCurrentTheme);
  }

  function handleThemeEdit(editedThemeName) {
    const updatedThemes = themes.map((theme) => {
      if (theme.name === currentTheme.name) {
        return {
          ...theme,
          name: editedThemeName,
        };
      }
      return theme;
    });
    setThemes(updatedThemes);

    const updatedCurrentTheme = updatedThemes.find(
      (theme) => theme.name === editedThemeName
    );
    setCurrentTheme(updatedCurrentTheme);
  }

  function handleDeleteTheme() {
    const updatedThemes = themes.filter(
      (theme) => theme.name !== currentTheme.name
    );

    setThemes(updatedThemes);
    setCurrentTheme(updatedThemes[0]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeSelect
        themes={themes}
        name={currentTheme.name}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onSubmitTheme={handleSubmitTheme}
        onThemeEdit={handleThemeEdit}
        onDeleteTheme={handleDeleteTheme}
      />
      <Theme
        colors={themes.length > 0 ? currentTheme.colors : ""}
        onAddColor={handleAddColor}
        onDeleteColor={handleDeleteColor}
        onUpdateColor={handleUpdateColor}
      />
    </>
  );
}

export default App;
