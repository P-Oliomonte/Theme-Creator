import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function Color({ color, onDelete, onUpdateColor }) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contrastEvaluation, setContrastEvaluation] = useState("loading...");
  // const [contrastEvaluation, setContrastEvaluation] = useLocalStorageState(
  //   "contrastEvaluation",
  //   { defaultValue: "loading..." }
  // );

  console.log(color);

  function handleToggleDelete() {
    setIsDelete(!isDelete);
  }

  function handleToggleEdit() {
    setIsEdit(!isEdit);
  }

  function onUpdateData(updatedColor) {
    onUpdateColor(updatedColor, color.id);
    handleToggleEdit();
  }

  async function fetchColorCheck(color1, color2) {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colors: [color1, color2] }),
      }
    );
    const responseData = await response.json();
    setContrastEvaluation(responseData?.overall);
  }

  useEffect(() => {
    fetchColorCheck(color.hex, color.contrastText);
  }, [color]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-hightlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <p>Contrast Check ok? – {contrastEvaluation}</p>

      {!isEdit && !isDelete && (
        <>
          <button type="button" onClick={handleToggleDelete}>
            DELETE
          </button>
          <button
            type="button"
            className="button-with-space"
            onClick={handleToggleEdit}
          >
            EDIT
          </button>
        </>
      )}

      {!isEdit && isDelete && (
        <>
          <p className="color-card-hightlight">Are you sure?</p>
          <button
            type="button"
            className="button-with-space"
            onClick={handleToggleDelete}
          >
            CANCEL
          </button>

          <button
            type="button"
            className="button-with-space"
            onClick={() => {
              onDelete(color.id);
            }}
          >
            DELETE
          </button>
        </>
      )}

      {isEdit && (
        <>
          <ColorForm
            onAddColor={onUpdateData}
            color={color}
            content={"UPDATE COLOR"}
            onFetchColorEvaluation={fetchColorCheck}
          />
          <button
            type="button"
            className="button-with-space"
            onClick={handleToggleEdit}
          >
            CANCEL
          </button>
        </>
      )}
    </div>
  );
}
