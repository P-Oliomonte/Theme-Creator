import Color from "../Color/Color";
import ColorForm from "../ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";

export default function Theme({
  colors,
  onAddColor,
  onDeleteColor,
  onUpdateColor,
}) {
  return (
    <>
      <ColorForm content={"ADD COLOR"} onAddColor={onAddColor} />

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              onDelete={onDeleteColor}
              onUpdateColor={onUpdateColor}
            />
          );
        })
      ) : (
        <p className="paragraph_no-colors">No colors... start adding colors.</p>
      )}
    </>
  );
}
