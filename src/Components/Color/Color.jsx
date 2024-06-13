import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import { useState } from "react";

export default function Color({ color, onDelete }) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  console.log(isEdit);

  function handleToggleDelete() {
    setIsDelete(!isDelete);
  }

  function handleToggleEdit() {
    setIsEdit(!isEdit);
  }

  function handleUpdateColor(id) {
    console.log("Update");
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

      {/* Start ternary statement !isEdit */}

      {!isEdit ? (
        !isDelete ? (
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
        ) : (
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
        )
      ) : (
        //
        <>
          <ColorForm
            onAddColor={() => {
              handleUpdateColor(color.id);
            }}
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
      {/* End ternary statement isEdit */}
    </div>
  );
}
