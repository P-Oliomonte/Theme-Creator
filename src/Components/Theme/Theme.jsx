import Color from "../Color/Color";
import ColorForm from "../ColorForm/ColorForm";
import "./Theme.css";

export default function Theme({
  colors,
  onAddColor,
  onDeleteColor,
  onUpdateColor,
}) {
  return (
    <>
      <div>
        <ColorForm content="ADD COLOR" onAddColor={onAddColor} />

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
          <p className="paragraph_no-colors">
            No colors... start adding colors.
          </p>
        )}
      </div>
    </>
  );
}
