import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import Clipboard from "../Clipboard/Clipboard";
import { useState, useEffect } from "react";

export default function Color({ color, onDelete, onUpdateColor }) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contrastEvaluation, setContrastEvaluation] = useState("loading...");

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
    setContrastEvaluation("loading...");
    try {
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

      if (!response.ok) {
        throw new Error(
          "Sorry, there seems to be a problem: ",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching color check:", error);
      setContrastEvaluation("Loading error");
    }
  }

  useEffect(() => {
    fetchColorCheck(color.hex, color.contrastText);
  }, [color.hex, color.contrastText]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-hightlight">{color.hex}</h3>
      <Clipboard hexColor={color.hex} />
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {contrastEvaluation === ("loading..." || "Loading error") && (
        <p className="contrast-check contrast-check-loading">
          Contrast check ok? – <strong>{contrastEvaluation}</strong>
        </p>
      )}

      {contrastEvaluation === "Nope" && (
        <p className="contrast-check contrast-check-nope">
          Contrast Check ok? – <strong>{contrastEvaluation}</strong>
        </p>
      )}

      {contrastEvaluation === "Kinda" && (
        <p className="contrast-check contrast-check-kinda">
          Contrast Check ok? – <strong>{contrastEvaluation}</strong>
        </p>
      )}

      {contrastEvaluation === "Yup" && (
        <p className="contrast-check contrast-check-yup">
          Contrast Check ok? – <strong>{contrastEvaluation}</strong>
        </p>
      )}

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
