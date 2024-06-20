import Color from "../Color/Color";
import ColorForm from "../ColorForm/ColorForm";
import "./Theme.css";

export default function Theme({
  themes,
  colors,
  onAddColor,
  onDeleteColor,
  onUpdateColor,
}) {
  return (
    <>
      {themes.length > 0 && (
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
      )}

      {themes.length === 0 && (
        <p className="paragraph_no-colors">No themes... add a theme.</p>
      )}
    </>
  );
}
