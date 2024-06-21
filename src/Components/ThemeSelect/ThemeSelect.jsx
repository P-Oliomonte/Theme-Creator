import { useState } from "react";
import "./ThemeSelect.css";

export default function ThemeSelect({
  themes,
  name,
  currentTheme,
  onThemeChange,
  onSubmitTheme,
  onThemeEdit,
  onDeleteTheme,
}) {
  const [mode, setMode] = useState("");

  function handleNewThemeForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitTheme(data.themeName);
    setMode("");
  }

  function handleThemeEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onThemeEdit(data.themeName);
    setMode("");
  }

  function handleDelete() {
    onDeleteTheme();
    setMode("");
  }

  return (
    <div className="theme-select">
      {mode === "" && (
        <>
          <form onChange={onThemeChange}>
            <select
              className="dropdown"
              name="theme-select"
              defaultValue={name}
            >
              {themes.length === 0 && <option value="">Add new theme</option>}
              {themes.map((theme) => {
                return (
                  <option key={theme.id} value={theme.name}>
                    {theme.name}
                  </option>
                );
              })}
            </select>
          </form>

          <button
            className="button"
            type="button"
            name="add-to-toggle"
            onClick={() => setMode("add")}
          >
            ADD
          </button>
          <button
            className="button button-with-space"
            type="button"
            name="edit-theme-name"
            onClick={() => setMode("edit")}
          >
            EDIT
          </button>
          <button
            className="button button-with-space"
            type="button"
            name="delete-theme"
            onClick={() => setMode("delete")}
            disabled={currentTheme.id === "t1"}
          >
            DELETE
          </button>
        </>
      )}

      {mode === "edit" && (
        <>
          <form onSubmit={handleThemeEdit}>
            <label className="input-label" htmlFor="add-theme-name">
              Theme Name
            </label>
            <input
              className="input"
              id="add-theme-name"
              type="text"
              name="themeName"
              defaultValue={name}
            />
            <button
              className="button"
              type="button"
              name="cancel"
              onClick={() => setMode("")}
            >
              CANCEL
            </button>
            <button
              className="button button-with-space"
              type="submit"
              name="add-to-add"
            >
              EDIT
            </button>
          </form>
        </>
      )}

      {mode === "add" && (
        <>
          <form onSubmit={handleNewThemeForm}>
            <label className="input-label" htmlFor="add-theme-name">
              Theme Name
            </label>
            <input
              className="input"
              id="add-theme-name"
              type="text"
              name="themeName"
              defaultValue="New theme name"
            />
            <button
              className="button"
              type="button"
              name="cancel"
              onClick={() => setMode("")}
            >
              CANCEL
            </button>
            <button
              className="button button-with-space"
              type="submit"
              name="add-to-add"
            >
              ADD
            </button>
          </form>
        </>
      )}

      {mode === "delete" && (
        <>
          <p className="sure-to-delete-theme">
            Are you sure you want to delete
          </p>
          <h3 className="theme-name">{name}?</h3>
          <button
            className="button"
            type="button"
            name="cancel"
            onClick={() => setMode("")}
          >
            CANCEL
          </button>
          <button
            className="button button-with-space"
            type="button"
            name="add-to-add"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </>
      )}
    </div>
  );
}
