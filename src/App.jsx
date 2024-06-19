import { initialThemes } from "./lib/colors";
import Theme from "./Components/Theme/Theme";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import "./App.css";
import { useState } from "react";

function App() {
  // const [colors, setColors] = useLocalStorageState("themeColors", {
  //   defaultValue: initialColors,
  // });

  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", {
    defaultValue: initialThemes[0],
  });

  console.log("themes: ", themes);
  console.log("currentTheme: ", currentTheme);
  console.log("currentThemeColors: ", currentTheme.colors);

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
    console.log("DELETE");

    const updatedThemes = themes.map((theme) => {
      if ((theme.name = currentTheme.name)) {
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
    const updatedThemes = [newTheme, ...themes];

    setThemes(updatedThemes);

    const updatedCurrentTheme = updatedThemes.find(
      (theme) => theme.name === newThemeName
    );
    setCurrentTheme(updatedCurrentTheme);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <Select
        themes={themes}
        onHandleThemeChange={handleThemeChange}
        onHandleSubmitTheme={handleSubmitTheme}
      />
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

function Select({ themes, onHandleThemeChange, onHandleSubmitTheme }) {
  const [isAdd, setIsAdd] = useState(false);

  function handleToggleAdd() {
    setIsAdd(!isAdd);
  }
  function handleNewThemeForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onHandleSubmitTheme(data.themeName);
    handleToggleAdd();
  }

  return (
    <>
      {!isAdd && (
        <>
          <form onChange={onHandleThemeChange}>
            <select name="theme-select">
              {themes.map((theme) => {
                return <option key={theme.id}>{theme.name}</option>;
              })}
            </select>
          </form>

          <button type="button" name="add-to-toggle" onClick={handleToggleAdd}>
            ADD
          </button>
        </>
      )}

      {isAdd && (
        <>
          <form onSubmit={handleNewThemeForm}>
            <label htmlFor="add-theme-name">Theme Name</label>
            <input
              id="add-theme-name"
              type="text"
              name="themeName"
              defaultValue="New theme name"
            />
            <button type="submit" name="add-to-add">
              ADD
            </button>
          </form>

          <button type="button" name="cancel" onClick={handleToggleAdd}>
            CANCEL
          </button>
        </>
      )}
    </>
  );
}
