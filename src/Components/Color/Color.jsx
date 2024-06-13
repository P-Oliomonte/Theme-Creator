import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDelete }) {
  const [isDelete, setIsDelete] = useState(false);

  function handleToggleDelete() {
    isDelete ? setIsDelete(false) : setIsDelete(true);
  }

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
      {!isDelete ? (
        <button type="button" onClick={handleToggleDelete}>
          DELETE
        </button>
      ) : (
        <>
          <p className="color-card-hightlight">Are you sure?</p>
          <button type="button" onClick={handleToggleDelete}>
            CANCEL
          </button>

          <button
            type="button"
            onClick={() => {
              onDelete(color.id);
            }}
          >
            DELETE
          </button>
        </>
      )}
    </div>
  );
}
