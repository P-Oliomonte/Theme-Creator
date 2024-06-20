import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import Clipboard from "../Clipboard/Clipboard";
import { useState, useEffect } from "react";

export default function Color({ color, onDelete, onUpdateColor }) {
  const [mode, setMode] = useState("");
  const [contrastEvaluation, setContrastEvaluation] = useState("loading...");

  const className =
    contrastEvaluation === "loading..." ||
    contrastEvaluation === "Loading error"
      ? "contrast-check contrast-check-loading"
      : contrastEvaluation === "Nope"
      ? "contrast-check contrast-check-nope"
      : contrastEvaluation === "Kinda"
      ? "contrast-check contrast-check-kinda"
      : contrastEvaluation === "Yup"
      ? "contrast-check contrast-check-yup"
      : "contrast-check";

  function onUpdateData(updatedColor) {
    onUpdateColor(updatedColor, color.id);
    setMode("");
  }
  useEffect(() => {
    async function fetchColorCheck() {
      setContrastEvaluation("loading...");
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
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
    fetchColorCheck();
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

      <p className={className}>
        Contrast check ok? – <strong>{contrastEvaluation}</strong>
      </p>

      {mode === "" && (
        <>
          <button type="button" onClick={() => setMode("delete")}>
            DELETE
          </button>
          <button
            type="button"
            className="button-with-space"
            onClick={() => setMode("edit")}
          >
            EDIT
          </button>
        </>
      )}

      {mode === "delete" && (
        <>
          <p className="color-card-hightlight">Are you sure?</p>
          <button
            type="button"
            className="button-with-space"
            onClick={() => setMode("")}
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

      {mode === "edit" && (
        <>
          <button
            type="button"
            className="button-with-space"
            onClick={() => setMode("")}
          >
            CANCEL
          </button>
          <ColorForm
            onAddColor={onUpdateData}
            color={color}
            content={"UPDATE COLOR"}
          />
        </>
      )}
    </div>
  );
}
