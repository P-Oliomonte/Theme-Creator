import { useState } from "react";
import "./ThemeSelect.css";

export default function ThemeSelect({
  themes,
  name,
  onHandleThemeChange,
  onHandleSubmitTheme,
  onHandleThemeEdit,
  onHandleDeleteTheme,
}) {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  function handleToggleIsAdd() {
    setIsAdd(!isAdd);
  }

  function handleToggleIsEdit() {
    setIsEdit(!isEdit);
  }

  function handleToggleIsDelete() {
    setIsDelete(!isDelete);
  }

  function handleNewThemeForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onHandleSubmitTheme(data.themeName);
    handleToggleIsAdd();
  }

  function handleThemeEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onHandleThemeEdit(data.themeName);
    handleToggleIsEdit();
  }

  function handleDelete() {
    onHandleDeleteTheme();
    handleToggleIsDelete();
  }

  return (
    <div className="theme-select">
      {!isAdd && !isEdit && !isDelete && (
        <>
          <form onChange={onHandleThemeChange}>
            <select name="theme-select" value={name}>
              {themes.map((theme) => {
                return <option key={theme.id}>{theme.name}</option>;
              })}
            </select>
          </form>

          <button
            className="button"
            type="button"
            name="add-to-toggle"
            onClick={handleToggleIsAdd}
          >
            ADD
          </button>
          <button
            className="button button-with-space"
            type="button"
            name="edit-theme-name"
            onClick={handleToggleIsEdit}
          >
            EDIT
          </button>
          <button
            className="button button-with-space"
            type="button"
            name="delete-theme"
            onClick={handleToggleIsDelete}
          >
            DELETE
          </button>
        </>
      )}

      {isEdit && (
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
            <button className="button" type="submit" name="add-to-add">
              EDIT
            </button>
            <button
              className="button button-with-space"
              type="button"
              name="cancel"
              onClick={handleToggleIsEdit}
            >
              CANCEL
            </button>
          </form>
        </>
      )}

      {isAdd && (
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
            <button className="button" type="submit" name="add-to-add">
              ADD
            </button>
            <button
              className="button button-with-space"
              type="button"
              name="cancel"
              onClick={handleToggleIsAdd}
            >
              CANCEL
            </button>
          </form>
        </>
      )}

      {isDelete && (
        <>
          <p className="sure-to-delet-theme">Are you sure you want to delete</p>
          <h3 className="theme-name">{name}?</h3>
          <button
            className="button"
            type="button"
            name="add-to-add"
            onClick={handleDelete}
          >
            DELETE
          </button>

          <button
            className="button button-with-space"
            type="button"
            name="cancel"
            onClick={handleToggleIsDelete}
          >
            CANCEL
          </button>
        </>
      )}
    </div>
  );
}
